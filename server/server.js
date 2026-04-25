// Express Setup
const express = require("express");
const app = express();
const path = require("path");

// Cors Setup
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Serve static files from React app
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "strawberry", "pineapple", "grape", "turtle"] });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});