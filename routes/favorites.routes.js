// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const Meal = require("../models/Meal.model.js")
// const Favorites = require("../models/favorites.model.js");
// const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

// router.post('/menu/:mealId/favorite', (req, res) => {
//     const {mealId} = req.params.id;
//     const userId = req.user._id; // Assuming you have user authentication
  
//     Meal.findById({mealId})
//       .then((foundMeal) => {
//         // Check if the user has already favorited the restaurant
//         const isFavorited = foundMeal.favorites.users.includes(userId);
  
//         if (isFavorited) {
//           // Unfavorite the restaurant
//           foundMeal.favorites.users.pull(userId);
//           foundMeal.favorites.count -= 1;
//         } else {
//           // Favorite the restaurant
//           foundMeal.favorites.users.push(userId);
//           foundMeal.favorites.count += 1;
//         }
  
//         return foundMeal.save();
//       })
//       .then((updatedMeal) => {
//         // Redirect or send a response as needed
//         res.redirect(`/menu/${updatedMeal._id}`)
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//       });
//   });
  
  
// module.exports = router;