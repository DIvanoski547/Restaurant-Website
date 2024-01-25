const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const favorites = require("../models/favorites.model");
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

app.post('/add-to-favorites', async (req, res) => {
    const { name } = req.body;

    // Create a new favorite and save it to the database
    await Favorite.create({ name });

    // Redirect back to the main page
    res.redirect('/');
});





module.exports = router;