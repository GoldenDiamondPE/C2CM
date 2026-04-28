const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

console.log("SERVER FILE IS RUNNING");

// Logging
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://coursestocareerpathmapperwa-e5gbh3grh6a6fxbj.eastus-01.azurewebsites.net"
  ],
  optionsSuccessStatus: 200,
}));

// Static React build
app.use(express.static(path.join(__dirname, "../client/dist")));

// API
app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "strawberry", "pineapple", "grape", "turtle"] });
});

// Debug route
app.get("/test-file", (req, res) => {
  const fs = require("fs");
  const filePath = path.join(__dirname, "../client/dist/index.html");

  res.send({
    exists: fs.existsSync(filePath),
    path: filePath
  });
});

// React fallback (LAST)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});