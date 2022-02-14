const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const testarray = req.query.tag.split(',')
    console.log(testarray)
  // console.log(req.query.tag)
  console.log(req.query.sortBy)
  res.send('respond with a resource');
});

// router.get()

module.exports = router;
