const express = require('express');
const router = express.Router();

router
   .get('/', (req, res) => {
      res.send("All users");
   })
   .get('/:userId', (req, res) => {
      res.send("One user's data");
   })
   .post('/:userId', (req, res) => {
      res.send("Send details for a user");
   })
   .put('/:userId', (req, res) => {
      res.send("Update details for a user");
   })

module.exports = router;