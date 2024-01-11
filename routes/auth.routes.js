const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const { isLoggedIn, isLoggedOut, isAdmin, isAdminOrEditor } = require('../middleware/route-guard.js');

/*-----GET SIGNUP PAGE-----*/
router.get("/signup", isLoggedOut, (req, res, next) => {
  console.log("req.session Signup", req.session)
  res.render("auth/signup");
});

/*-----POST SIGNUP PAGE-----*/
router.post("/signup", isLoggedOut, (req, res, next) => {
  const { username, email, password } = req.body;

  // Check that a username, email, and password have been provided
  if (username === "" || email === "" || password === "") {
    res.render(
      "auth/signup",
      { errorMessage: "All fields are mandatory. Please provide a username, email and password." }
      );
    return;
  }

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
                      res.redirect('/profile')
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

  //   ! This regular expression checks password for special characters and minimum length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(400)
      .render("auth/signup", {
        errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    });
    return;
  }
  */

  // Create a new user - start by hashing the password

//   bcrypt
//     .genSalt(saltRounds)
//     .then((salt) => bcrypt.hash(password, salt))
//     .then((hashedPassword) => {
//       // Create a user and save it in the database
//       return User.create({ username, email, password: hashedPassword });
//     })
//     .then((user) => {
//       res.redirect("/auth/login");
//     })
//     .catch((error) => {
//       if (error instanceof mongoose.Error.ValidationError) {
//         res.status(500).render("auth/signup", { errorMessage: error.message });
//       } else if (error.code === 11000) {
//         res.status(500).render("auth/signup", {
//           errorMessage:
//             "Username and email need to be unique. Provide a valid username or email.",
//         });
//       } else {
//         next(error);
//       }
//     });
// });

/*-----GET LOGIN PAGE-----*/
router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login")
});

/*-----POST LOGIN ROUTE-----*/
router.post("/login", isLoggedOut, (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  const { username, email, password } = req.body;

  // Check that username, email, and password are provided
  if (username === "" || email === "" || password === "") {
    res.render(
      "auth/login",
      { errorMessage: "All fields are mandatory. Please provide username, email and password." }
      );
    return;
  };

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password

  /*-----NOT SURE IF WE NEED TO CHECK PASSWORD LENGTH DURING LOGIN-----*/
  /*-----IT'S PROBABLY ENOUGH IF THE PASSWORD IS JUST WRONG-----*/
  // if (password.length < 8) {
  //   res.render(
  //     "auth/login",
  //     { errorMessage: "Your password needs to be a minimum of 8 characters." }
  //     );
  //   return;
  // };


  User.findOne({ username })
    .then(foundUser => {
        console.log('Found user:', foundUser)
      if (!foundUser) {
        console.log("Username not registered in database.");
        res.render(
          'auth/login',
          { errorMessage: 'Invalid username or password. Please try again.' }
          );
        return;
      }
      else if (bcrypt.compareSync(password, foundUser.password)) {
        //******* SAVE THE USER IN THE SESSION ********//
        req.session.currentUser = foundUser;
        console.log(`${foundUser.username} has successfully logged in.`)
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

  // Search the database for a user with the email submitted in the form
  // User.findOne({ email })
  //   .then((user) => {
  //     // If the user isn't found, send an error message that user provided wrong credentials
  //     if (!user) {
  //       res
  //         .status(400)
  //         .render("auth/login", { errorMessage: "Wrong credentials." });
  //       return;
  //     }

  //     // If user is found based on the username, check if the in putted password matches the one saved in the database
  //     bcrypt
  //       .compare(password, user.password)
  //       .then((isSamePassword) => {
  //         if (!isSamePassword) {
  //           res
  //             .status(400)
  //             .render("auth/login", { errorMessage: "Wrong credentials." });
  //           return;
  //         }

  //         // Add the user object to the session object
  //         req.session.currentUser = user.toObject();
  //         // Remove the password field
  //         delete req.session.currentUser.password;

  //         res.redirect("/");
  //       })
  //       .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
  //   })
  //   .catch((err) => next(err));
});

/*-----POST LOGOUT-----*/
router.post('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    console.log('The user has successfully logged out.')
    res.redirect('/');
  });
});

// router.post("/logout", isLoggedIn, (req, res, next) => {
//   req.session.destroy((err) => {
//     if (err) {
//       res.status(500).render("auth/logout", { errorMessage: err.message });
//       return;
//     }

//     res.redirect("/");
//   });
// });

/*-----GET PROFILE PAGE-----*/
  router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("user/profile", { userInSession: req.session.currentUser });
});

module.exports = router;
