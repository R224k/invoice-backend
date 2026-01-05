const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "invoice.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("DB connection error:", err.message);
  } else {
    console.log("✅ SQLite database connected");
  }
});

// CREATE TABLES
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_number TEXT NOT NULL,
      client_name TEXT NOT NULL,
      date TEXT NOT NULL,
      amount REAL NOT NULL,
      status TEXT NOT NULL
    )
  `);
});

module.exports = db;
