// Express Setup
const express = require("express");
const app = express();

// Cors Setup
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "strawberry", "pineapple", "grape", "turtle"] });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});