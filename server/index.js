require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const crypto = require('crypto');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

// Initialize Gemini and Google Auth
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSy_YOUR_API_KEY_HERE');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'sanjeev_super_secret_key_123';

const app = express();
app.use(express.json());
app.use(cors());

// Generate a random mock Health ID
function generateHealthId() {
  return 'SANJ-' + crypto.randomBytes(3).toString('hex').toUpperCase();
}

// ----------------------------------------------------
// AUTHENTICATION API
// ----------------------------------------------------
app.post('/api/auth/register', (req, res) => {
  const { name, role, passkey } = req.body;
  if (!name || !role || !passkey) {
    return res.status(400).json({ error: 'Please provide name, role, and passkey' });
  }

  const healthId = generateHealthId();

  const sql = "INSERT INTO users (name, role, passkey, healthId) VALUES (?,?,?,?)";
  const params = [name, role, passkey, healthId];

  db.run(sql, params, function (err) {
    if (err) {
      if (err.message.includes('NOT NULL constraint')) return res.status(400).json({ error: err.message });
      return res.status(500).json({ error: err.message });
    }
    
    // Auto-create some demo medical history for new patient accounts
    if (role === 'patient') {
      db.run("INSERT INTO medical_history (userId, title, date, description) VALUES (?,?,?,?)", 
             [this.lastID, 'Initial Registration', new Date().toISOString().split('T')[0], 'Account created and health profile established.']);
    }

    res.json({
      message: 'User registered successfully',
      user: { id: this.lastID, name, role, healthId }
    });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { role, passkey } = req.body;
  if (!role || !passkey) {
    return res.status(400).json({ error: 'Please provide role and passkey' });
  }

  const sql = "SELECT * FROM users WHERE role = ? AND passkey = ?";
  db.get(sql, [role, passkey], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(401).json({ error: 'Invalid credentials or user not found' });

    res.json({
      message: 'Login successful',
      user: { id: row.id, name: row.name, role: row.role, healthId: row.healthId }
    });
  });
});

app.post('/api/auth/google', async (req, res) => {
  const { credential, role } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;
    const assignedRole = role || 'patient';

    // Check if user exists
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      
      if (row) {
        // User exists, generate token
        const token = jwt.sign({ id: row.id, role: row.role }, JWT_SECRET, { expiresIn: '7d' });
        return res.json({
          message: 'Google login successful',
          token,
          user: { id: row.id, name: row.name, role: row.role, email: row.email, healthId: row.healthId }
        });
      } else {
        // Create new Google user
        const healthId = generateHealthId();
        const sql = "INSERT INTO users (name, role, passkey, healthId, email) VALUES (?,?,?,?,?)";
        db.run(sql, [name, assignedRole, 'GOOGLE_AUTH', healthId, email], function(err2) {
          if (err2) return res.status(500).json({ error: err2.message });
          
          if (assignedRole === 'patient') {
            db.run("INSERT INTO medical_history (userId, title, date, description) VALUES (?,?,?,?)", 
                   [this.lastID, 'Google Auth Registration', new Date().toISOString().split('T')[0], 'Account created via Google.']);
          }

          const token = jwt.sign({ id: this.lastID, role: assignedRole }, JWT_SECRET, { expiresIn: '7d' });
          return res.json({
            message: 'Google registration successful',
            token,
            user: { id: this.lastID, name, role: assignedRole, email, healthId }
          });
        });
      }
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({ error: 'Invalid Google credential' });
  }
});

// ----------------------------------------------------
// PROFILE DATA API
// ----------------------------------------------------
app.get('/api/users/:id/profile', (req, res) => {
  const userId = req.params.id;
  db.get("SELECT id, name, role, healthId FROM users WHERE id = ?", [userId], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Fetch medical history logs for that user
    db.all("SELECT * FROM medical_history WHERE userId = ?", [userId], (err, history) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        user,
        medicalHistory: history || []
      });
    });
  });
});

// ----------------------------------------------------
// CONTACTS API
// ----------------------------------------------------
app.get('/api/users/:id/contacts', (req, res) => {
  const userId = req.params.id;
  db.all("SELECT * FROM emergency_contacts WHERE userId = ?", [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/users/:id/contacts', (req, res) => {
  const userId = req.params.id;
  const { name, relation, phone, isSOS } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone required' });
  
  const sql = "INSERT INTO emergency_contacts (userId, name, relation, phone, isSOS) VALUES (?,?,?,?,?)";
  db.run(sql, [userId, name, relation, phone, isSOS ? 1 : 0], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, userId, name, relation, phone, isSOS: isSOS ? 1 : 0 });
  });
});

// ----------------------------------------------------
// INTEGRATIONS API
// ----------------------------------------------------
// PRESCRIPTIONS
app.get('/api/users/:id/prescriptions', (req, res) => {
  db.all("SELECT * FROM prescriptions WHERE userId = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/users/:id/prescriptions', (req, res) => {
  const { doctorName, medication, dosage, instructions, date } = req.body;
  const sql = "INSERT INTO prescriptions (userId, doctorName, medication, dosage, instructions, date) VALUES (?,?,?,?,?,?)";
  db.run(sql, [req.params.id, doctorName, medication, dosage, instructions, date], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, userId: req.params.id, doctorName, medication, dosage, instructions, date });
  });
});

// MOOD LOGS
app.get('/api/users/:id/moods', (req, res) => {
  db.all("SELECT * FROM mood_logs WHERE userId = ? ORDER BY date DESC", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/users/:id/moods', (req, res) => {
  const { moodLevel, notes, date } = req.body;
  const sql = "INSERT INTO mood_logs (userId, moodLevel, notes, date) VALUES (?,?,?,?)";
  db.run(sql, [req.params.id, moodLevel, notes, date], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, userId: req.params.id, moodLevel, notes, date });
  });
});

// CLEARSCRIPT AI SCANNER (Powered by Gemini)
app.post('/api/scan-prescription', async (req, res) => {
  try {
    const { rawText, image } = req.body;
    const model = genAI.getGenerativeModel({ model: "models/gemini-flash-latest" });
    
    const prompt = `You are an expert AI prescription scanner. Analyze the provided text or handwriting of a doctor's prescription. 
    Extract the medication name, dosage, instructions, and doctor's name if possible. 
    Return ONLY a valid JSON object with exactly these keys:
    { "confidence": (integer 0-100), "doctorName": "string", "medication": "string", "dosage": "string", "instructions": "string" }
    
    Raw text provided: ${rawText || "Check provided image"}`;
    
    const parts = [{ text: prompt }];
    if (image) {
      parts.push({
        inlineData: {
          data: image,
          mimeType: "image/jpeg"
        }
      });
    }
    
    const result = await model.generateContent(parts);
    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI did not return valid JSON: " + responseText);
    const parsedData = JSON.parse(jsonMatch[0]);
    
    res.json(parsedData);
  } catch (err) {
    console.error('Gemini Scanner Error:', err);
    res.status(500).json({ error: 'Gemini AI Error: ' + err.message });
  }
});

// DRUG INTERACTIONS ENGINE (Powered by Gemini)
app.post('/api/check-interactions', async (req, res) => {
  try {
    const { medications } = req.body; 
    if (!medications || medications.length < 2) {
      return res.json({ hasInteraction: false });
    }

    const model = genAI.getGenerativeModel({ model: "models/gemini-flash-latest" });
    
    const prompt = `You are an expert clinical pharmacologist AI. Analyze the following list of medications for potential interactions and "prescription cascades".
    A prescription cascade is when a side effect of one drug is misinterpreted as a new symptom, leading to the prescription of a second drug.
    Medications to check: ${medications.join(', ')}
    
    If there is a significant interaction or cascade risk, return ONLY a valid JSON object formatted exactly like this:
    {
      "hasInteraction": true,
      "cascade": true,
      "severity": "High",
      "message": "Detailed explanation of the interaction."
    }
    If no significant risk exists, return exactly: { "hasInteraction": false }
    Do not include any Markdown formatting or extra text outside the JSON.`;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI did not return valid JSON: " + responseText);
    const parsedData = JSON.parse(jsonMatch[0]);
    
    res.json(parsedData);
  } catch (err) {
    console.error('Gemini Interaction Error:', err);
    res.status(500).json({ error: 'Gemini AI Interaction Error: ' + err.message });
  }
});

// SYMPTOM CHECKER ENGINE (Powered by Gemini)
app.post('/api/analyze-symptoms', async (req, res) => {
  try {
    const { symptoms, userId } = req.body;
    
    // Fetch user's current medications
    db.all("SELECT * FROM prescriptions WHERE userId = ?", [userId], async (err, meds) => {
      if (err) return res.status(500).json({ error: 'Database error: ' + err.message });
      
      const medList = meds.length > 0 ? meds.map(m => m.medication).join(', ') : "No active medications found in profile.";
      const model = genAI.getGenerativeModel({ model: "models/gemini-flash-latest" });
      
      const prompt = `You are a medical AI assistant.
      Patient Symptoms: "${symptoms}"
      Current Medications: ${medList}
      
      Check if any reported symptoms are common side effects of the listed medications.
      Return a concise, helpful response (max 3 sentences). 
      If a match is found, start with "Drug Correlation Found:". 
      If no match, say "No direct medication correlation found, but please monitor closely."`;
      
      try {
        const result = await model.generateContent(prompt);
        res.json({ analysis: result.response.text() });
      } catch (aiErr) {
        res.status(500).json({ error: 'Gemini Analysis Error: ' + aiErr.message });
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error: ' + err.message });
  }
});

// Serve Frontend in Production
app.use(express.static(path.join(__dirname, '../dist')));
app.get(/^.*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Sanjeev AI Backend Server running on port', PORT);
});
