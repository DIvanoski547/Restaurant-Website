const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

// Require necessary middleware to control access to specific routes
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

/*-----GET SIGNUP PAGE-----*/
router.get("/signup", isLoggedOut, (req, res, next) => {
  console.log("req.session Signup", req.session)
  res.render("auth/signup")
});

/*-----POST SIGNUP PAGE-----*/
router.post("/signup", isLoggedOut, (req, res, next) => {
  const { username, email, password } = req.body;
  const { userId } = req.params;

  // Check that a username, email, and password have been provided
  if (username === "" || email === "" || password === "") {
    console.log("Either a username, email or a password or all three have not been entered.")
    res.render(
      "auth/signup",
      { errorMessage: "All fields are mandatory. Please provide a username, email and password." }
      );
    return;
  };

  // Check that the password is at least 8 characters long
  if (password.length < 8) {
    res.render(
      "auth/signup",
      { errorMessage: "Your password must be a minimum of 8 characters." }
      );
    return;
  }

  User.findOne({ username }) //check to see if user already exists
        .then(foundUser => {
            if(foundUser){
                // If user already exists, send an error notification
                res.render(
                    "auth/signup",
                    { errorMessage: "Username invalid. Please try a different username." }
                    );
            }
            else { //if user does not exist, proceed to encrypt password
              bcrypt.hash(password, saltRounds) //to encrypt password
                  .then((hashedPassword) => {
                      console.log('Password hash of new user:', hashedPassword)
                      return User.create({ username, email, password: hashedPassword})
                  })
                  .then(createdUser => {
                      console.log(`New user ${createdUser.username} has been successfully created and added to the database.`)
                      req.session.currentUser = createdUser;
                      res.redirect('/menu')
                  })
                  .catch(error => {
                      console.log('Error creating user: ', error);
                      next(error);
                  });
                }
        })
        .catch(error => {
          console.log('Error finding user: ', error);
          next(error);
      });
});

/*-----GET LOGIN PAGE-----*/
router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login")
});

/*-----POST LOGIN ROUTE-----*/
router.post("/login", isLoggedOut, (req, res, next) => {
  console.log('ACTIVE SESSION =====> ', req.session);
  const { email, password } = req.body;

  // Check that email, and password are provided
  if (email === "" || password === "") {
    res.render(
      "auth/login",
      { errorMessage: "All fields are mandatory. Please provide email and password." }
      );
    return;
  };

  User.findOne({ email })
    .then(foundUser => {
        console.log('Found user:', foundUser)
      if (!foundUser) {
        console.log("Email address not registered in database.");
        res.render(
          'auth/login',
          { errorMessage: 'Invalid email or password. Please try again.' }
          );
        return;
      }
      else if (bcrypt.compareSync(password, foundUser.password)) {
        //******* SAVE THE USER IN THE SESSION ********//
        req.session.currentUser = foundUser;
        console.log(`${foundUser.email} has successfully logged in.`)
        // Clear the password field
        delete req.session.currentUser.password;
        res.redirect('/');
      }
      else {
        console.log("Incorrect password.");
        res.render(
          'auth/login',
          { errorMessage: 'User not found and/or incorrect password.' }
          );
      }
    })
    .catch(error => {
        console.log('Error logging user in: ', error);
        next(error);
    });
});

/*-----POST LOGOUT-----*/
router.post('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    console.log('The user has successfully logged out.')
    res.redirect('/');
  });
});

/*-----GET PROFILE PAGE-----*/
  router.get("/profile/:userId", isLoggedIn, (req, res, next) => {
    const { userId } = req.params;
    console.log('req.params', req.params)
    let isOwnProfile;

    User.findById(userId)
      .then((foundUser) => {
        console.log ("Current logged in user is: ", foundUser);
        Comment.find({ author: userId })
        .populate("dish")
        .then((foundComments) => {
          console.log('foundComments', foundComments);
          res.render("user/profile", { foundComments, userInSession: req.session.currentUser })
          // if (foundUser._id === req.session.currentUser) {
          //   res.render("user/profile", { foundComments, userInSession: req.session.currentUser });
          // }
        })
      })
      .catch(error => {
          console.log('Error while retrieving user details: ', error);
          next(error);
      });

});

module.exports = router;
