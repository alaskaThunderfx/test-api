const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  try {
    res.status(200).json({ success: true })
  } catch {
    res.sendStatus(404)
  }
});

module.exports = router;
