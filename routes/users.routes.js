const express = require('express');
const router = express.Router();

const User = require("../models/User.model");

// Require necessary middleware to control access to specific routes
const { isAdmin, isAdminOrModerator } = require('../middleware/route-guard.js');


/*-----GET CREATE USER-----*/
// display the form which allows new users to be created
router.get('/users/create', isAdmin, (req, res) => {
  res.render('user/new-user', { userInSession: req.session.currentUser })
});

/*-----POST CREATE USER-----*/
// route to create a user using data submitted via form
router.post('/users/create', (req, res, next) => {
  console.log('New user added via online form:', req.body);
  const { username, email, password, role } = req.body;

  // Check that a username, email, and password have been provided
  if (username === "" || email === "" || password === "") {
    console.log("Either a username, email or a password or all three have not been entered.")
    res.render(
      "user/new-user",
      { errorMessage: "All fields are mandatory. Please provide a username, email and password." }
      );
    return;
  };

  // Check that the password is at least 8 characters long
  if (password.length < 8) {
    res.render(
      "user/new-user",
      { errorMessage: "The password must be a minimum of 8 characters." }
      );
    return;
  }

  User.findOne({ email })
      .then((foundUser) => {
          if (!foundUser) { //if user does not exist, proceed to encrypt password
            bcrypt.hash(password, saltRounds) //to encrypt password
                  .then((hashedPassword) => {
                      console.log('Password hash of new user:', hashedPassword)
                      return User.create({ username, email, password: hashedPassword, role })
                  })
                  .then(createdUser => {
                    console.log(`New user ${createdUser.username} has been successfully created and added to the database.`)
                    res.redirect("/users")
                  });
          } 
          else {
              res.render("user/new-user", {
              errorMessage: "This user already exists in the database."
              });
              console.log('The user has not been added to the database. User already exists.');
              return;
          }
      })
      .catch(error => {
          console.log('Error creating new user: ', error);
          next(error);
      });
}); 

/* GET ALL USERS */
// route to display a list of all users found in the database
router.get('/users', (req, res, next) => {
  User.find()
      .then((allUsers) => {
          res.render('user/all-users', { allUsers })
          console.log(`There are currently ${allUsers.length} users in the database.`);
      })
      .catch(error => {
          console.log('Error while displaying list of all users: ', error);
          next(error);
      });
});

/* EDIT USER */

/* DELETE USER */

  module.exports = router;