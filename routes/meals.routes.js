const express = require('express');
const router = express.Router();

const Meal = require("../models/Meal.model");

/* -------- MENU PAGE --------*/
router.get("/menu", (req, res, next) => {
    res.render("meals/menu", { userInSession: req.session.currentUser } );
  });

router.get("/meal", (req, res, next) => {
    res.render("meals/meal")
})

  module.exports = router;