const express = require('express');
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User, Meal and Comment models in order to interact with the database
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

// Require necessary middleware to control access to specific routes
const { isAdmin } = require('../middleware/route-guard.js');

/*-----GET ALL USERS-----*/
// backend route, for an admin, to display a list of all users found in the database
router.get('/users', isAdmin, (req, res, next) => {
  User.find()
      .then((allUsers) => {
          res.render('user/all-users', { allUsers, userInSession: req.session.currentUser })
          console.log(`There are currently ${allUsers.length} users in the database.`);
      })
      .catch(error => {
          console.log('Error while displaying list of all users: ', error);
          next(error);
      });
});

/*-----GET ONE USER-----*/
// backend route, for an admin, to display a specific user on the user-details page
// including comments
router.get('/users/:userId', isAdmin, (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
      .then(foundUser => {
        Comment.find({ author: userId })
        .populate("dish")
        .then((foundComments) => {
          console.log('foundComments', foundComments);
          res.render('user/user-details', { foundUser, foundComments })
        })
      })
      .catch(error => {
          console.log('Error while retrieving user details: ', error);
          next(error);
      });
});

/*-----GET EDIT ANY USER-----*/
// backend route, for an admin, to find the user we would like to edit in the database
// show a pre-filled form to update a user's info
router.get('/users/:userId/edit', isAdmin, (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
      .then((foundUser) => res.render('user/edit-user', { foundUser }))
      .catch(error => {
          console.log('Error while updating user: ', error);
          next(error);
      });
});

/*-----POST UPDATE ANY USER-----*/
// backend route, for an admin, to submit the form to update the user in the database
// save the updated user to the database
router.post('/users/:userId/edit', isAdmin, (req, res, next) => {
  const { userId } = req.params;
  const { username, role } = req.body;

  User.findByIdAndUpdate(userId, { username, role })
      .then((foundUser) => {
          console.log(foundUser);
          res.redirect(`/users`) // Don't need "${foundUser._id}" in the redirect
      })
      .catch(error => {
          console.log('Error while updating user: ', error);
          next(error);
      });
});

  module.exports = router;