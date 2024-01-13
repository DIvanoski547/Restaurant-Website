const express = require('express');
const router = express.Router();

const User = require("../models/User.model");

// Require necessary middleware to control access to specific routes
const { isAdmin, isAdminOrModerator } = require('../middleware/route-guard.js');


/*-----GET CREATE USER-----*/
router.get('/users/create', isAdmin, (req, res) => {
  res.render('user/new-user', { userInSession: req.session.currentUser })
});

/*-----POST CREATE USER-----*/

/* GET ALL USERS */

/* EDIT USER */

/* DELETE USER */

  module.exports = router;