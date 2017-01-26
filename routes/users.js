var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Name: Juan\n\nDNI: 35273025');
});

module.exports = router;
