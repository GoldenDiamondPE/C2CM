const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs").promises;

const app = express();
const PORT = process.env.PORT || 8080;

// Path to JSON files
const coursesdb = path.join(__dirname, "data", "courses.json");
const studentsdb = path.join(__dirname, "data", "students.json");
const majorsdb = path.join(__dirname, 'data', 'undergradMajors.json');
const minorsdb = path.join(__dirname, 'data', 'undergradMinors.json');


// middleware
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "coursestocareerpathmapperwa-e5gbh3grh6a6fxbj.eastus-01.azurewebsites.net"
  ],
}));


// 1. Get all students
app.get("/api/students", async (req, res) => {
  const rawData = await fs.readFile(studentsdb, "utf8");
  const data = JSON.parse(rawData);
  res.json(data.students);
});

// 2. Get all courses
app.get("/api/courses", async (req, res) => {
  const rawData = await fs.readFile(coursesdb, "utf8");
  const data = JSON.parse(rawData);
  res.json(data.courses);
});

app.get('/api/majors', async (req, res) => {
  try {
    const content = await fs.readFile(majorsdb, 'utf-8');
    const json = JSON.parse(content);
    res.json(json);
  } catch (err) {
    console.error("Error reading majors file:", err);
    res.status(500).json({ error: "Failed to load majors list" });
  }
});

app.get('/api/minors', async (req, res) => {
  try {
    const content = await fs.readFile(minorsdb, 'utf-8');
    const json = JSON.parse(content);
    res.json(json);
  } catch (err) {
    console.error("Error reading minors file:", err);
    res.status(500).json({ error: "Failed to load minors list" });
  }
});

// 3. Add a course ID to a student's class list
app.post("/api/enroll", async (req, res) => {
  const { studentName, courseId } = req.body;

  // FIXED: Now uses the studentsdb variable
  const rawData = await fs.readFile(studentsdb, "utf8");
  const data = JSON.parse(rawData);

  // Find student and push the course integer ID
  const student = data.students.find(s => s.name === studentName);
  student.classes.push(parseInt(courseId));

  // FIXED: Now uses the studentsdb variable
  await fs.writeFile(studentsdb, JSON.stringify(data, null, 2));

  res.json(student);
});


// serve frontend (for production build)
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*any", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});