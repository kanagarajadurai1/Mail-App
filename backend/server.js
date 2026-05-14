const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    'https://mail-app-f1.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());
app.use(express.json());

const ADMIN = { username: 'admin', password: bcrypt.hashSync('admin123', 10) };

app.get('/', (req, res) => {
  res.json({ message: 'BulkMail API running' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN.username || !bcrypt.compareSync(password, ADMIN.password))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

app.use('/api/emails', require('./routes/emailRoutes'));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);

module.exports = app;