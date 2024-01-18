const express = require('express');
const router = express.Router();

// Require necessary middleware to control access to specific routes
const { isLoggedIn, isLoggedOut, isAdmin, isAdminOrModerator } = require('../middleware/route-guard.js');

// Require the Meal model in order to interact with the database
const Meal = require("../models/Meal.model");

/*-----GET MENU PAGE-----*/
router.get("/menu", (req, res, next) => {
  Meal.find()
      .then((allMeals) => {
          res.render('meals/menu', { allMeals, userInSession: req.session.currentUser })
          console.log(`There are currently ${allMeals.length} users in the database.`);
      })
      .catch(error => {
          console.log('Error while displaying list of all users: ', error);
          next(error);
      });
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

/*-----POST CREATE MEAL-----*/
// route to create a new meal using data submitted via form
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
// route to display a list of all meals found in the database
router.get('/meals', isAdmin, (req, res, next) => {
  Meal.find()
      .then((allMeals) => {
          res.render('meals/all-meals', { allMeals, userInSession: req.session.currentUser })
          console.log(`There are currently ${allMeals.length} users in the database.`);
      })
      .catch(error => {
          console.log('Error while displaying list of all users: ', error);
          next(error);
      });
});

/*-----GET SINGLE MEAL-----*/
// route to display a specific meal on the meal-details page
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
// route to delete a specific meal from the database
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
// route to find the meal we would like to edit in the database
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
// route to submit the form to update the meal in the database
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