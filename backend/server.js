const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();
connectDB();

const app = express();

app.options('*', cors());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const ADMIN = { username: 'admin', password: bcrypt.hashSync('admin123', 10) };

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN.username || !bcrypt.compareSync(password, ADMIN.password))
    return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

app.use('/api/emails', require('./routes/emailRoutes'));

app.get('/', (req, res) => res.json({ status: 'Backend running!' }));

module.exports = app;
