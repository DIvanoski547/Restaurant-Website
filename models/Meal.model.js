const { Schema, model } = require("mongoose");

const mealSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    ingredients: {
      type: String,
      required: true
    },
    allergens: {
      type: String,
      required: true
    },
    spiceLevel: {
      type: String,
      enum:['0', '1', '2', '3', '4', '5']
    },
    mealImage: {
      type: String,
      default: 'URL'
    },
    category: {
      type: String,
      enum:['salad', 'soup', 'appetizer', 'dessert', 'main dish', 'side'],
      required: false
    },
    cuisine: {
      type: String,
      required: false
    },
    dishType: {
      type: String,
      enum:['breakfast', 'lunch', 'dinner', 'dessert'],
      required: false
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  {
    timestamps: true,
  }
);

const Meal = model("Meal", mealSchema);

module.exports = Meal;
