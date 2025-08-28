// index.js
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

app.use(express.json());

// In-memory stores (replace with DB later)
const users = [];        // { id, name, email, passwordHash, createdAt }
const diagnoses = [];    // { id, userId, symptoms, condition, confidence, notes, createdAt, createdBy }

// --- Utility: generate JWT ---
function generateToken(user) {
  // include only what's needed in the token payload
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

// --- Middleware: authenticate token ---
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid Authorization format. Use: Bearer <token>' });
  }

  const token = parts[1];
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: 'Invalid or expired token' });
    req.user = { id: payload.id, email: payload.email };
    next();
  });
}

// --- / welcome msg ---
app.get("/", (req, res) => {
  res.send("Welcome to MediGuide API");
});

// --- Health endpoint (already had this) ---
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime_seconds: process.uptime(), timestamp: new Date().toISOString() });
});

// --- POST /auth/register ---
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email and password are required' });
    }

    // simple uniqueness check
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: uuidv4(),
      name,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    users.push(user);

    const token = generateToken(user);
    // return minimal user + token
    res.status(201).json({ id: user.id, name: user.name, email: user.email, token });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- POST /auth/login ---
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const user = users.find(u => u.email === email.toLowerCase());
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(user);
    // safe user object (no password)
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- POST /diagnoses (authenticated) ---
app.post('/diagnoses', authenticateToken, (req, res) => {
  try {
    const { symptoms, condition, confidence = null, notes = '' } = req.body || {};
    if (!Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: 'symptoms must be a non-empty array' });
    }
    if (!condition) return res.status(400).json({ error: 'condition is required' });

    const diag = {
      id: uuidv4(),
      userId: req.user.id,
      symptoms,
      condition,
      confidence: typeof confidence === 'number' ? confidence : null,
      notes,
      createdAt: new Date().toISOString(),
      createdBy: 'user',
    };
    diagnoses.push(diag);
    res.status(201).json(diag);
  } catch (err) {
    console.error('Create diagnosis error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- GET /diagnoses/:id (authenticated, owner only) ---
app.get('/diagnoses/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const diag = diagnoses.find(d => d.id === id);
    if (!diag) return res.status(404).json({ error: 'Diagnosis not found' });

    // Owner-only access (simple model)
    if (diag.userId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden: you do not own this diagnosis' });
    }

    res.json(diag);
  } catch (err) {
    console.error('Get diagnosis error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Optional: list diagnoses for current user
app.get('/diagnoses', authenticateToken, (req, res) => {
  const my = diagnoses.filter(d => d.userId === req.user.id);
  res.json(my);
});

app.listen(PORT, () => {
  console.log(`MediGuide API listening on http://localhost:${PORT}`);
});
