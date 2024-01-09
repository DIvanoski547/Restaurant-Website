const express = require('express');
const router = express.Router();

const User = require("../models/User.model");

/* -------- PROFILE PAGE --------*/
router.get("/profile", (req, res, next) => {
    res.render("user/profile");
  });






  module.exports = router;