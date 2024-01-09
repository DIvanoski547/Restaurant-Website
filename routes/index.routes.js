const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* -------- MENU PAGE --------*/
router.get("/menu", (req, res, next) => {
  res.render("menu");
});

/* -------- PROFILE PAGE --------*/
router.get("/profile", (req, res, next) => {
  res.render("profile");
});






module.exports = router;
