const mongoose = require("mongoose");
const Meal = require("../models/Meal.model");
require("dotenv").config();

const meals = [
  {
    name: "Spicy Beef Platter",
    ingredients:
      "thinly sliced beef, green onions, sesame seeds, porcini mushrooms, carrots",
    allergens: "none",
    spiceLevel: "3",
    mealImage:
      "https://res.cloudinary.com/dcsk4b8kl/image/upload/v1706140772/Restaurant-website/elnrftoehmktnqxlanfs.jpg",
    category: "Main Dish",
    cuisine: "Southeast Asian",
    dishType: "Dinner",
  },

  {
    name: "Biryani",
    ingredients:
      "basmati rice, boiled egg, saffron, fennel seeds, butter, pepper, cloves, ginger, onions, tomatoes, green chilies, garlic",
    allergens: "none",
    spiceLevel: "2",
    mealImage:
      "https://res.cloudinary.com/dcsk4b8kl/image/upload/v1706297021/Restaurant-website/kyqjv67fu4zpweppdwj2.jpg",
    category: "Side",
    cuisine: "South Asian",
    dishType: "Lunch",
  },
  {
    name: "Crunchy White Rice",
    ingredients:
      "basmati rice, saffron, cashews, diced carrots, corn, green peas, green beans",
    allergens: "nuts (cashews)",
    spiceLevel: "0",
    mealImage:
      "https://res.cloudinary.com/dcsk4b8kl/image/upload/v1706297528/Restaurant-website/evdzrbho81ic5vb3uurw.jpg",
    category: "Side",
    cuisine: "South Asian",
    dishType: "Lunch",
  },
  {
    name: "Bourbon Chicken and Rice",
    ingredients:
      "yellow rice, chopped bourbon style chicken, potato wedges, red onions, tomatoes, cucumber, lemon ",
    allergens: "lactose",
    spiceLevel: "2",
    mealImage:
      "https://res.cloudinary.com/dcsk4b8kl/image/upload/v1706297528/Restaurant-website/o0apsax2w0js3r84z5xe",
    category: "Main Dish",
    cuisine: "US-American",
    dishType: "Dinner",
  },
  {
    name: "White Rice and Curry Potatoes",
    ingredients:
      "basmati rice, saffron, cooked potatoes, parsley, lime, ginger, garlic, onions, pepper",
    allergens: "none",
    spiceLevel: "3",
    mealImage:
      "https://res.cloudinary.com/dcsk4b8kl/image/upload/v1706298464/Restaurant-website/uzd67m3lk7qnxujs5jug.jpg",
    category: "Main Dish",
    cuisine: "South Asian",
    dishType: "Dinner",
  },
  {
    name: "NY Cheesecake",
    ingredients:
      "eggs, sugar, butter cookies, cream cheese, lemon juice, curd cheese",
    allergens: "lactose, gluten",
    spiceLevel: "0",
    mealImage:
      "https://res.cloudinary.com/dcsk4b8kl/image/upload/v1706302200/Restaurant-website/movp4gjze80ji1gyt3wn.jpg",
    category: "Dessert",
    cuisine: "US-American",
    dishType: "Dessert",
  },
];

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Restaurant-website";

mongoose
  .connect(MONGO_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .then(() => Meal.create(meals))
  .then((allMeals) => console.log(`${allMeals.length} meals were added`))
  .then(() => mongoose.connection.close())
  .catch((err) => console.log(err));
