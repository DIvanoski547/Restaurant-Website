const express = require('express');
const router = express.Router();

const Meal = require("../models/Meal.model");

/*-----GET MENU PAGE-----*/
router.get("/menu", (req, res, next) => {
    res.render("meals/menu", { userInSession: req.session.currentUser } );
  });

/*-----SINGLE MEAL-----*/
router.get("/meal", (req, res, next) => {
    res.render("meals/meal", { userInSession: req.session.currentUser })
})

  module.exports = router;