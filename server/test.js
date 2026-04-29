const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require('fs').promises; 

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); 

// 1. MIDDLEWARE 
// Place CORS at the very top to handle pre-flight requests
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://azurewebsites.net"
  ],
  optionsSuccessStatus: 200,
}));

app.get("/api/fruits", (req, res) => {
  res.json({ fruits: ["apple", "strawberry", "pineapple", "grape", "turtle"] });
});


app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/*path", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
