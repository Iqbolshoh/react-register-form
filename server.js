import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.static('dist'));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Storage endpoint
app.post('/storage', async (req, res) => {
  try {
    const { personalInfo, testResult } = req.body;
    
    // Validate required data
    if (!personalInfo || !testResult) {
      return res.status(400).json({ 
        error: 'Personal info and test result are required' 
      });
    }

    // Create data object
    const studentData = {
      id: Date.now().toString(),
      personalInfo: {
        lastName: personalInfo.lastName,
        firstName: personalInfo.firstName,
        fatherName: personalInfo.fatherName,
        age: personalInfo.age,
        phone: personalInfo.phone,
        currentCourse: personalInfo.currentCourse,
        direction: personalInfo.direction,
        programmingLevel: personalInfo.programmingLevel,
        languageLevel: personalInfo.languageLevel,
        desiredCourse: personalInfo.desiredCourse,
        hasNotebook: personalInfo.hasNotebook,
      },
      testResult: {
        percentage: testResult.percentage,
        score: testResult.score,
        totalQuestions: testResult.totalQuestions,
        completedAt: testResult.completedAt,
      },
      submittedAt: new Date().toISOString(),
    };

    // Read existing data
    const filePath = path.join(__dirname, 'students.json');
    let students = [];
    
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      students = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      students = [];
    }

    // Add new student data
    students.push(studentData);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(students, null, 2));

    res.json({ 
      success: true, 
      message: 'Ma\'lumotlar muvaffaqiyatli saqlandi',
      studentId: studentData.id 
    });

  } catch (error) {
    console.error('Storage error:', error);
    res.status(500).json({ 
      error: 'Server xatoligi yuz berdi' 
    });
  }
});

// Get all students (optional endpoint for viewing data)
app.get('/students', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'students.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const students = JSON.parse(fileContent);
    res.json(students);
  } catch (error) {
    res.json([]);
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlamoqda`);
});