const { Schema, model } = require("mongoose");

const mealSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    ingredients: {
      type: [ String ],
      required: true
    },
    allergens: {
      type: [ String ],
      required: true
    },
    spiceLevel: {
      type: Number,
      min: 1,
      max: 5
    },
    mealImage: {
      type: String,
      default: 'URL'
    },
    category: {
      type: String,
      enum:['vegan', 'vegetarian'],
      required: false
    },
    quisine: {
      type: String,
      required: false
    },
    dishType: {
      type: String,
      enum:['breakfast', 'lunch', 'dinner', 'dessert'],
      required: false
    }
    // comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  {
    timestamps: true,
  }
);

const Meal = model("Meal", mealSchema);

module.exports = Meal;
