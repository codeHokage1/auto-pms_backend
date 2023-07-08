const express = require('express');
const router = express.Router();

router
   .post('/register', (req, res) => {
      res.send("Register your account");
   })
   .post('/login', (req, res) => {
      res.send("Login to your account");
   })

module.exports = router;