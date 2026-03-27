const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const crypto = require('crypto');

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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Sanjeev AI Backend Server running on port', PORT);
});
