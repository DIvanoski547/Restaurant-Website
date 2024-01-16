const express = require('express');
const router = express.Router();

// Require necessary middleware to control access to specific routes
const { isLoggedIn, isLoggedOut, isAdmin, isAdminOrModerator } = require('../middleware/route-guard.js');

// Require the Meal model in order to interact with the database
const Meal = require("../models/Meal.model");

/*-----GET MENU PAGE-----*/
router.get("/menu", (req, res, next) => {
    res.render("meals/menu", { userInSession: req.session.currentUser } );
  });

/*-----GET SINGLE MEAL-----*/
router.get("/meal", (req, res, next) => {
    res.render("meals/meal", { userInSession: req.session.currentUser })
});

/*-----GET CREATE MEAL-----*/
// display the form which allows new meals to be created
router.get('/meals/create', isAdmin, (req, res) => {
  res.render('meals/new-meal', { userInSession: req.session.currentUser })
});

  module.exports = router;