const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs").promises;

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
}));

// absolute path to db.json
const DB_PATH = path.join(__dirname, "data", "/db.json");

// helper to read JSON
async function readDB() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

app.get("/api/courses", async (req, res) => {
  const db = await readDB();
  res.json(db.courses);
});
app.get("/api/jobs", async (req, res) => {
  const db = await readDB();
  res.json(db.jobs);
});
app.get("/api/student", async (req, res) => {
  const db = await readDB();
  res.json(db.student);
});


// serve frontend (for production build)
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});