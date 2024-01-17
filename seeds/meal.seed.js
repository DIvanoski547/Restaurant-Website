const mongoose = require("mongoose");
const Meal = require("../models/Meal.model");

const meals = [
  { 
    name: "Spaghetti with tomato sauce",
  ingredients: "tomato sauce" ,
  allergens:"gluten",
  spiceLevel: 2,
  mealImage: "../public/images/spaghettiTomato.jpg",
  category: "main dish",
  cuisine: "Italian",
  dishType: "lunch",

},
  
];

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Restaurant-website";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return Meal.create(meals);
  })
  .then((allMeals) =>
    console.log(`${allMeals.length} meals were added`)
  )
  .then(() => mongoose.connection.close())
  .catch((err) => console.log(err));
