import express from "express";
import sqlite3pkg from "sqlite3";
const sqlite3 = sqlite3pkg.verbose();
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import metricRoutes from "./src/routes/metric.route.js";

const { json } = bodyParser;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database(join(__dirname, "metrics.db"), (err) => {
  if (err) {
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

app.locals.db = db;

// create table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL,
    value REAL NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('distance', 'temperature')),
    unit TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Middleware to parse JSON
app.use(json());

// Middleware to extract userId from header
app.use((req, res, next) => {
  const userId = req.header("userId");
  if (!userId) {
    return res.status(400).json({ error: "Missing userId header" });
  }
  req.userId = parseInt(userId, 10);
  next();
});

// Mount metric routes
app.use("/", metricRoutes());

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
