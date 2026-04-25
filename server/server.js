// Express Setup
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;


console.log("SERVER FILE IS RUNNING");
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("ROOT WORKS");
});

// Cors Setup
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173", "coursestocareerpathmapperwa-e5gbh3grh6a6fxbj.eastus-01.azurewebsites.net"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Serve static files from React app
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "strawberry", "pineapple", "grape", "turtle"] });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});


app.get("/test-file", (req, res) => {
  const fs = require("fs");
  const filePath = path.join(__dirname, "../client/dist/index.html");

  res.send({
    exists: fs.existsSync(filePath),
    path: filePath
  });
});