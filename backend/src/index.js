const express = require('express');
const cors = require('cors');
const pool = require('./db');
const authRoutes = require('./routes/auth');  
const boardRoutes = require('./routes/boards');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/boards', boardRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'CoBoard backend is running!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});