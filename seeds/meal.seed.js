const mongoose = require("mongoose");
const Meal = require("../models/Meal.model");

const meals = [
  { 
  name: "Spaghetti with tomato sauce",
  ingredients: "tomato sauce" ,
  allergens:"gluten",
  spiceLevel: 2,
  mealImage: "/images/spaghettiTomato.jpg",
  category: "main dish",
  cuisine: "Italian",
  dishType: "lunch",
},
{ 
  name: "Tacos",
  ingredients: "Corn tortillas, fried fish pieces, lettuce, tomatoes, shredded cheddar cheese, sour cream" ,
  allergens:"lactose",
  spiceLevel: 0,
  mealImage: "/images/tacos.jpg",
  category: "main dish",
  cuisine: "Mexican",
  dishType: "lunch",
}
  
];

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Restaurant-website";

mongoose.connect(MONGO_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .then(() => Meal.create(meals))
  .then((allMeals) => console.log(`${allMeals.length} meals were added`))
  .then(() => mongoose.connection.close())
  .catch((err) => console.log(err));
