const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.join(__dirname, 'db.sqlite');

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      passkey TEXT NOT NULL,
      healthId TEXT UNIQUE
    )`, (err) => {
      if (err) console.error('Error creating users table', err);
    });

    // Create Medical History Table
    db.run(`CREATE TABLE IF NOT EXISTS medical_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      title TEXT,
      date TEXT,
      description TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )`, (err) => {
      if (err) console.error('Error creating medical_history table', err);
    });

    // Create Prescriptions Table
    db.run(`CREATE TABLE IF NOT EXISTS prescriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      doctorName TEXT,
      medication TEXT,
      dosage TEXT,
      instructions TEXT,
      date TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )`, (err) => {
      if (err) console.error('Error creating prescriptions table', err);
    });

  }
});

module.exports = db;
