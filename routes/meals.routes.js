const express = require('express');
const router = express.Router();

// Require necessary middleware to control access to specific routes
const { isLoggedIn, isLoggedOut, isAdmin, isAdminOrModerator } = require('../middleware/route-guard.js');

// Require the Meal and Comment models in order to interact with the database
const Meal = require("../models/Meal.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");

/*-----GET MENU PAGE-----*/
// public route to get menu page and display a list of all meals found in the database
router.get("/menu", (req, res, next) => {
  Meal.find()
      .then((allMeals) => {
          res.render('meals/menu', { allMeals, userInSession: req.session.currentUser })
          console.log(`There are currently ${allMeals.length} meals in the database.`);
      })
      .catch(error => {
          console.log('Error while displaying list of all meals: ', error);
          next(error);
      });
  });

/*-----GET SINGLE MEAL-----*/
// public route to display a specific meal on the menu/meal page
router.get("/menu/meal/:mealId", (req, res, next) => {
  const { mealId } = req.params;

  Meal.findById(mealId)
    .populate({
      path: "comments",
      populate: {
        path: "author",
          select: "username"
      }})
      .then(foundMeal => {
        console.log('foundMeal', foundMeal);
        console.log('found author', foundMeal.comments)
        res.render('meals/meal', { foundMeal, userInSession: req.session.currentUser })
      })
      .catch(error => {
          console.log('Error while retrieving meal details: ', error);
          next(error);
      });
});

/*-----POST COMMENT ON MEAL-----*/ 
// route to post comment on a specific meal on the menu/meal page
router.post("/menu/meal/:mealId/create-comment", (req, res, next) => {
  const { content } = req.body;
  const { mealId } = req.params;
  let dish = mealId;
  let author = req.session.currentUser;

  Comment.create({ dish, author, content })
  .then((newComment) => {
    console.log ('The following is the new comment to be posted: ', newComment)
    Meal.findByIdAndUpdate(dish, { $push: { comments: newComment._id } })
    .then(() => res.redirect(`/menu/meal/${mealId}`))
  })
  .catch(error => {
      console.log('Error while creating comment: ', error);
      next(error);
  });
})

/*-----GET CREATE MEAL-----*/
// backend display the form which allows new meals to be created
router.get('/meals/create', isAdmin, (req, res) => {
  res.render('meals/new-meal', { userInSession: req.session.currentUser })
});

/*-----POST CREATE MEAL-----*/
// backend route to create a new meal using data submitted via form
router.post('/meals/create', isAdmin, (req, res, next) => {
  console.log('New meal added via online form:', req.body);
  const { name, ingredients, allergens, spiceLevel, mealImage, category, cuisine, dishType } = req.body;

  // Check that a name, ingredients and allergens have been provided
  if (name === "" || ingredients === "" || allergens === "") {
    console.log("Either a name, ingredients or allergens, or all three, have not been provided.")
    res.render(
      "meals/new-meal",
      { errorMessage: "All fields are mandatory. Please provide a name, ingredients and allergens." }
      );
    return;
  };

  Meal.findOne({ name })
      .then((foundMeal) => {
        if (!foundMeal) {
          Meal.create({ name, ingredients, allergens, spiceLevel, mealImage, category, cuisine, dishType })
              .then(() => res.redirect("/meals"));
              console.log('New meal successfully added to database.')
      } 
          else {
              res.render("meals/new-meal", {
              errorMessage: "This meal already exists in the database."
              });
              console.log('The meal has not been added to the database. Meal already exists.');
              return;
          }
      })
      .catch(error => {
          console.log('Error creating new meal: ', error);
          next(error);
      });
});

/*-----GET ALL MEALS-----*/
// backend route to display a list of all meals found in the database
router.get('/meals', isAdmin, (req, res, next) => {
  Meal.find()
      .then((allMeals) => {
          res.render('meals/all-meals', { allMeals, userInSession: req.session.currentUser })
          console.log(`There are currently ${allMeals.length} meals in the database.`);
      })
      .catch(error => {
          console.log('Error while displaying list of all meals: ', error);
          next(error);
      });
});

/*-----GET SINGLE MEAL-----*/
// backend route to display a specific meal on the meal-details page
router.get('/meals/:mealId', isAdmin, (req, res, next) => {
  const { mealId } = req.params;

  Meal.findById(mealId)
      .then(foundMeal => res.render('meals/meal-details', { foundMeal, userInSession: req.session.currentUser }))
      .catch(error => {
          console.log('Error while retrieving meal details: ', error);
          next(error);
      });
});

/*-----POST DELETE MEAL-----*/
// backend route to delete a specific meal from the database
router.post('/meals/:mealId/delete', isAdmin, (req, res, next) => {
  const { mealId } = req.params;

  Meal.findByIdAndDelete(mealId)
      .then(() => res.redirect('/meals'))
      .catch(error => {
          console.log('Error while deleting meal: ', error);
          next(error);
      });
});

/*-----GET EDIT ANY MEAL-----*/
// backend route to find the meal we would like to edit in the database
// show a pre-filled form to update a meal's info
router.get('/meals/:mealId/edit', isAdmin, (req, res, next) => {
  const { mealId } = req.params;

  Meal.findById(mealId)
      .then((foundMeal) => res.render('meals/edit-meal', { foundMeal }))
      .catch(error => {
          console.log('Error while updating meal: ', error);
          next(error);
      });
});

/*-----POST UPDATE ANY MEAL-----*/
// backend route to submit the form to update the meal in the database
// save the updated meal to the database
router.post('/meals/:mealId/edit', isAdmin, (req, res, next) => {
  const { mealId } = req.params;
  const { name, ingredients, allergens, spiceLevel, mealImage, category, cuisine, dishType } = req.body;

  Meal.findByIdAndUpdate(mealId, { name, ingredients, allergens, spiceLevel, mealImage, category, cuisine, dishType })
      .then((foundMeal) => {
          console.log(foundMeal);
          res.redirect(`/users/${foundMeal._id}`)
      })
      .catch(error => {
          console.log('Error while updating meal: ', error);
          next(error);
      });
});

  module.exports = router;