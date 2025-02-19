const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));

const dbPath = path.resolve(__dirname, "database.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("DB connection error:", err.message);
    process.exit(1);
  }
  console.log("The database connection is established.");
});

db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error("Create TABLE error", err.message);
    } else {
      console.log("TABLE 'users' ready to use.");
    }
  }
);

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }
  const query = `INSERT INTO users (name, email) VALUES (?, ?)`;
  db.run(query, [name, email], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/users/:id", (req, res) => {
  const query = "SELECT * FROM users WHERE id = ?";
  const id = req.params.id;
  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(row);
  });
});

app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.run(query, [name, email, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated", id, name, email });
  });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM users WHERE id = ?";
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({ message: "User deleted", id });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on address: http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("DB error:", err.message);
    } else {
      console.log("The database connection is closed.");
    }
    process.exit(0);
  });
});
