const mongoose = require("mongoose");
const Meal = require("../models/Meal.model");
require("dotenv").config();

const meals = [
  { 
  name: "Spaghetti with tomato sauce",
  ingredients: "tomato sauce" ,
  allergens:"gluten",
  spiceLevel: 2,
  mealImage: "/images/spaghettiTomato.jpg",
  category: "Main Dish",
  cuisine: "Italian",
  dishType: "Lunch",
},
{ 
  name: "Tacos",
  ingredients: "Corn tortillas, fried fish pieces, lettuce, tomatoes, shredded cheddar cheese, sour cream" ,
  allergens:"lactose",
  spiceLevel: 0,
  mealImage: "/images/tacos.jpg",
  category: "Main Dish",
  cuisine: "Mexican",
  dishType: "Lunch",
},
{
  name: "Pizza",
  ingredients: "flour, ketchup, cheese",
  allergens: "lactose, gluten",
  spiceLevel: "0",
  mealImage: "/images/pizza.jpg",
  category: "Main Dish",
  cuisine: "Italian",
  dishType: "Lunch"
}, 
{
  name: "Spicy Beef",
  ingredients: "thinly sliced beef, green onions, sesame seeds, porcini mushrooms, carrots",
  allergens: "none",
  spiceLevel: "3",
  mealImage: "https://res.cloudinary.com/dcsk4b8kl/image/upload/v1706140772/Restaurant-website/elnrftoehmktnqxlanfs.jpg",
  category: "Main Dish",
  cuisine: "Asian",
  dishType: "Dinner"
},
{
  name: "Tiramisu",
  ingredients: "Ladyfingers, Mascarpone, Coffee, Heavy Whipped cream, Granulated Sugar, Vanilla Extract, Cocoa powder",
  allergens: "lactose, gluten",
  spiceLevel: "0",
  mealImage: "/images/tiramisu.jpg",
  category: "Dessert",
  cuisine: "Italian",
  dishType: "Dessert"
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
