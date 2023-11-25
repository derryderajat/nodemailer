const dotenv = require("dotenv");
const morgan = require("morgan");

const express = require("express");
const app = express();

app.use(morgan("dev"));

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
  });
}
