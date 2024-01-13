const express = require('express');
const router = express.Router();

// Require necessary middleware to control access to specific routes
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

/*-----GET HOME PAGE-----*/
router.get("/", (req, res, next) => {
  res.render("index", { userInSession: req.session.currentUser });
});

module.exports = router;
