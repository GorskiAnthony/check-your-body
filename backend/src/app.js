const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cookies = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const statRouter = require("./routers/statRouter");

const app = express();

app.use(cookies());

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use("/api", statRouter);
app.use("/auth", authRouter);
app.use("/images", express.static(path.join(__dirname, "../public/uploads")));

// Redirect all requests to the REACT app
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export
module.exports = app;
