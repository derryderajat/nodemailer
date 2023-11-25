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

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("checkPassword", (password) => {
    const validation = validatePassword(password);
    socket.emit("passwordValidationResult", validation);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

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
  res.json({ message: "go" });
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});
const v1_router = require("./src/routes");

app.use("/api", v1_router);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  http.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
  });
}
