const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.get('/api/v1', (req, res) => {
   res.send("Welcome to Auto PMS - by Group 1");
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);

app.listen(3000, () => {
   console.log("Server is listening on port 3000");
})