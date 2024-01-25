const { Schema, model } = require("mongoose");

const favoritesSchema = new Schema(
  {
    name: {
        type: String,
    }
  }
);

const favorites = model("Favorites", favoritesSchema);

module.exports = favorites;
