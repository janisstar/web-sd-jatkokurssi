
require("dotenv").config();

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcryptjs");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Manager API",
      version: "1.0.0",
      description: "API foe user management",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.get("/openapi.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(swaggerDocs, null, 2));
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

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
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error("Error create table:", err.message);
    } else {
      console.log("Table 'users' ready.");
    }
  }
);



/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing required fields
 */
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, username });
  });
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates user with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Invalid credentials
 */
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Insert username and password" });
  }

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Wrong password" });

    res.json({ id: user.id, username: user.username });
  });
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetch a list of all users
 *     responses:
 *       200:
 *         description: List of users
 */
app.get("/users", (req, res) => {
  db.all("SELECT id, username FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Fetch a single user by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 */
app.get("/users/:id", (req, res) => {
  db.get("SELECT id, username FROM users WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "User not found" });
    res.json(row);
  });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Fully update a user
 *     description: Updates username and password for a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
app.put("/users/:id", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  db.run("UPDATE users SET username = ?, password = ? WHERE id = ?", [username, hashedPassword, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User updated successfully" });
  });
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Partially update a user
 *     description: Updates either username or password for a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
app.patch("/users/:id", async (req, res) => {
  const { username, password } = req.body;
  let query = "UPDATE users SET";
  const params = [];

  if (username) {
    query += " username = ?,";
    params.push(username);
  }
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    query += " password = ?,";
    params.push(hashedPassword);
  }

  query = query.slice(0, -1); // Remove last comma
  query += " WHERE id = ?";
  params.push(req.params.id);

  db.run(query, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User updated successfully" });
  });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
app.delete("/users/:id", (req, res) => {
  db.run("DELETE FROM users WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  });
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the user by clearing the session or token
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
app.post("/logout", (req, res) => {
  res.json({ message: "User logged out successfully" });
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