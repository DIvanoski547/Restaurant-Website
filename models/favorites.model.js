const { Schema, model } = require("mongoose");

const favoritesSchema = new Schema(
  {
    name: {
        type: String,
    }
  }
);

const Favorites = model("Favorites", favoritesSchema);

module.exports = Favorites;
