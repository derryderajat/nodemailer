const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const Joi = require("joi");
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require("cors");
app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat123", (data) => {
    io.sockets.emit("chat", data);
  });
  const to_client = "AAJOJ2109";
  const from_client = "BBBpwk1-01jpw";
  socket.on(to_client, (data) => {
    // console.log(data);
    const message = "Welcome";
    io.emit(from_client, message);
  });

  // ===================
  socket.on("checkPassword", (password) => {
    const validation = validatePassword(password);
    socket.emit("passwordValidationResult", validation);
  });
  socket.on("forgotPasswordRequest", (data) => {
    handleForgotPasswordRequest(data.email, socket);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
const handleForgotPasswordRequest = async (email, socket) => {
  try {
    const user = await findOne({ email: email });
    if (user) {
      let token = await createToken({
        id: user.id,
        email: user.email,
        is_verified: user.is_verified,
      });
      const { host, referer } = socket.handshake.headers;

      // Check if the referer header is present and starts with "https"
      const isSecure = referer && referer.startsWith("https");

      // Use the protocol accordingly
      const protocol = isSecure ? "https" : "http";

      // Construct the resetLink with the determined protocol
      const resetLink = `${protocol}://${host}/api/v1/user/reset-password?token=${token}&email=${encodeURIComponent(
        email
      )}`;

      await forgotPassword(email, resetLink);
      socket.emit("forgotPasswordResponse", { status: 200, token, resetLink });
    } else {
      socket.emit("forgotPasswordResponse", {
        status: 400,
        message: "Email is not registered",
      });
    }
  } catch (error) {
    console.log(error);
    socket.emit("forgotPasswordResponse", {
      status: 500,
      message: "Internal Server Error",
    });
  }
};

function validatePassword(password) {
  const passwordSchema = Joi.object({
    password: Joi.string()
      .min(6)
      .regex(/(?=.*[a-z])/)
      .regex(/(?=.*[A-Z])/)
      .regex(/(?=.*\d)/)
      .required(),
  });

  const { error, value } = passwordSchema.validate({ password: password });
  if (error) return { isValid: false, message: error.message };
  return { isValid: true, message: "Password is valid" };
}

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "layout", "coba.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(process.cwd(), "layout", "login.html"));
});
app.get("/forgot-password", (req, res) => {
  res.sendFile(path.join(process.cwd(), "layout", "forgot-password.html"));
});
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});
const v1_router = require("./src/routes");
const { findOne } = require("./src/repositories/user.repository");
const { createToken } = require("./src/utils/jwt");
const { forgotPassword } = require("./src/libs/mailer");

app.use("/api", v1_router);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  http.listen(PORT, "127.0.0.1", () => {
    console.log(`Server is running on port:${PORT}`);
  });
}
