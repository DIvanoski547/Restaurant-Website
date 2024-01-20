const express = require('express');
const router = express.Router();

// Require the User, Meal and Comment models in order to interact with the database
const User = require("../models/User.model");
const Meal = require("../models/Meal.model");
const Comment = require("../models/Comment.model");

/*-----GET COMMENT CREATE PAGE-----*/
// public route to get comment create page

module.exports = router;