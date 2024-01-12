const express = require('express');
const router = express.Router();

// Require necessary middleware to control access to specific routes
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

/*-----GET HOME PAGE-----*/
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("index");
});

module.exports = router;
