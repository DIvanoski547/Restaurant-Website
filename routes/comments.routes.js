const express = require('express');
const router = express.Router();

// Require the User, Meal and Comment models in order to interact with the database
const User = require("../models/User.model");
const Meal = require("../models/Meal.model");
const Comment = require("../models/Comment.model");

/*-----GET COMMENT CREATE PAGE-----*/
// public route to get comment create page
router.get("/menu/meal", (req, res, next) => {
    const { userId } = req.params;

    User.findById(userId)
      .then((foundUser) => {
        res.render("meals/meal", { foundUser, userInSession: req.session.currentUser });
      })
      .catch(error => {
        console.log('Error while displaying comment creation page: ', error);
        next(error);
    });

    // Meal.find()
    //   .then((allMeals) => {
    //       res.render('comments/new-comment', { allMeals, userInSession: req.session.currentUser })
    //   })
    //   .catch(error => {
    //       console.log('Error while displaying list of all meals: ', error);
    //       next(error);
    //   });
});

/*-----POST COMMENT CREATE PAGE-----*/
// public route to submit form to create a comment
router.post("/comment/create", (req, res, next) => {
    const { dish, author, content } = req.body;
  
    Comment.create({ dish, author, content }) //1. Create a new comment 
    .then((newComment) => {
      // when the new comment is created, the user needs to be found and its comments updated with the
      // ID of newly created comment
      return User.findByIdAndUpdate(author, { $push: { comments: newComment._id } });
    })//2. Update the User document "comments" field with the new comment id
    .then((newComment) => {
        // when the new comment is created, the meal needs to be found and its comments updated with the
        // ID of newly created comment
        return Meal.findByIdAndUpdate(dish, { $push: { comments: newComment._id } });
      })//2. Update the Meal document "comments" field with the new comment id
    // .then(() => res.redirect('/menu/meal/'))//3. Redirect to a different page
    .catch(error => {
        console.log('Error while displaying comment creation page: ', error);
        next(error);
    });
  })

module.exports = router;