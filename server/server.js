require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs").promises;

const mongoose = require("mongoose");


const app = express();
const PORT = process.env.PORT || 8080;

// Path to JSON files
const coursesdb = path.join(__dirname, "data", "courses.json");
const studentsdb = path.join(__dirname, "data", "students.json");
const majorsdb = path.join(__dirname, 'data', 'undergradMajors.json');
const minorsdb = path.join(__dirname, 'data', 'undergradMinors.json');
const skillsdb = path.join(__dirname, 'data', 'skills.json');

// middleware
app.use(express.json());

//Start MongoDB


app.use(cors({
  origin: [
    "http://localhost:5173",
    "coursestocareerpathmapperwa-e5gbh3grh6a6fxbj.eastus-01.azurewebsites.net"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));




mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });


//End MongoDB
app.use("/api/auth", require("./routes/auth"));


// Get all students
app.get("/api/students", async (req, res) => {
  const rawData = await fs.readFile(studentsdb, "utf8");
  const data = JSON.parse(rawData);
  res.json(data.students);
});

// Get all courses
app.get("/api/courses", async (req, res) => {
  const rawData = await fs.readFile(coursesdb, "utf8");
  const data = JSON.parse(rawData);
  res.json(data.courses);
});

// Get all majors
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

// Get all minors
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

// Get all skills
app.get('/api/skills', async (req, res) => {
  try {
    const rawData = await fs.readFile(skillsdb, 'utf8');
    const data = JSON.parse(rawData);
        res.json(data.skills); 
  } catch (err) {
    console.error("Error reading skills file:", err);
    res.status(500).json({ error: "Failed to load skills list" });
  }
});


app.post('/api/students/append', async (req, res) => {
  const newStudents = req.body.students;

  if (!newStudents || !Array.isArray(newStudents)) {
    return res.status(400).json({ error: "Invalid format. Expected an object with a 'students' array." });
  }

  try {
    const fileData = await fs.readFile(studentsdb, 'utf8');
    const existingStudents = JSON.parse(fileData);

    //Check existing IDs
    const existingIds = new Set(existingStudents.map(s => s.id));
    const duplicateIdsInPayload = new Set();
    const validatedNewStudents = [];

    for (const student of newStudents) {
      const { id, course, skills, major, password } = student;

      // Ensure required fields exist
      if (!id || !course || !skills || !major || !password) {
        return res.status(400).json({ error: `Student missing required fields: ${JSON.stringify(student)}` });
      }

      // Check against already existing IDs OR duplicates within the uploaded file itself
      if (existingIds.has(id) || duplicateIdsInPayload.has(id)) {
        return res.status(400).json({ error: `Duplicate ID detected: Student ID '${id}' already exists.` });
      }

      duplicateIdsInPayload.add(id);
      validatedNewStudents.push({ id, course, skills, major, password });
    }

    // Append and Save
    const updatedStudents = [...existingStudents, ...validatedNewStudents];
    await fs.writeFile(studentsdb, JSON.stringify(updatedStudents, null, 2), 'utf8');

    res.status(200).json({ 
      message: 'Students successfully appended!', 
      countAdded: validatedNewStudents.length 
    });

  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: 'Internal server error while processing data.' });
  }
});

// serve frontend (for production build)
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*any", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});