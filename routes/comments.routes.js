const express = require('express');
const router = express.Router();

// Require the User, Meal and Comment models in order to interact with the database
const User = require("../models/User.model");
const Meal = require("../models/Meal.model");
const Comment = require("../models/Comment.model");

/*-----GET COMMENT CREATE PAGE-----*/
// public route to get comment create page
// router.get("/comment/create", (req, res, next) => {
//     // const { userId } = req.params;

//     User.findById(userId)
//       .then((foundUser) => {
//         res.render("comments/new-comment", { foundUser, userInSession: req.session.currentUser });
//       })
//       .catch(error => {
//         console.log('Error while displaying comment creation page: ', error);
//         next(error);
//     });

//     // Meal.find()
//     //   .then((allMeals) => {
//     //       res.render('comments/new-comment', { allMeals, userInSession: req.session.currentUser })
//     //   })
//     //   .catch(error => {
//     //       console.log('Error while displaying list of all meals: ', error);
//     //       next(error);
//     //   });
// });

/*-----POST COMMENT CREATE PAGE-----*/
// public route to submit form to create a comment
// router.post("/comment/create", (req, res, next) => {
//     const { title, content } = req.body;
//     const { mealId } = req.params;

//     // Meal.findById(mealId)
//     //     .then(foundMeal => res.render('meals/meal', { foundMeal, userInSession: req.session.currentUser }))
//     //     .catch(error => {
//     //         console.log('Error while retrieving meal details: ', error);
//     //         next(error);
//     //     });
  
//     Comment.create({ title, dish, author, content })
//     .then((newComment) => {
//       console.log ('new comment', newComment)
//     })
//     .then(() => res.redirect(`/menu/meal/${mealId}`))
//     // .then((newComment) => {
//     //   return Meal.findByIdAndUpdate(dish, { $push: { comments: newComment._id } });
//     // })
//     .catch(error => {
//         console.log('Error while displaying comment creation page: ', error);
//         next(error);
//     });
//   })

module.exports = router;