// app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const status=require('./routes/status');
const authRoutes = require('./routes/authRoutes');


const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/status',status);
app.use('/api/auth', authRoutes);



//Test route to check API status
app.get('/', (req, res) => {
  res.send('DevConnect API is running...');
});


module.exports = app;
