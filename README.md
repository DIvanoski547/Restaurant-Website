# SavorEats Bistro

https://restaurant-website-nw8x.onrender.com/

## Description
***SavorEats Bistro*** At SavorEats Bistro, our journey began with a simple yet profound vision – to create a haven for food enthusiasts, a place where flavors come alive, and memories are made. Established in 2023, we embarked on this culinary adventure with the aim of offering a unique blend of delectable cuisine, inviting ambiance, and impeccable service.

## Main Functionalities
- View menu and individual menu items as logged in or non-logged in user.
- Different nav bar for logged in and non-logged in users
- User creation via sign up form, update user profile (administrator only).
- Registered users can log in.
- Meal creation (adminstrator only, image of meal can also be uploaded), display, deletion and update (including meal image).
- Registered users can leave comments on meals. Comments include timestamps.
- Registered users can see comments they have left on their profile page. Administrators can also see a user's comments when view the user's details page.
- Administrators can access all users and all meals by going to /users and /meals. There are no links to this pages included in the nav bar.

## Backlog
- Add ability to add meals to a favorites list
- Add a nav bar shown only to administrators
- Add ability for users to edit their own profile
- Sort user list by date
- Implement async/await

## Technologies Used
- HTML
- CSS
- Bootstrap
- JavaScript
- Express.js
- Handlebars
- MongoDB
- Npm
- Node.js
- Cloudinary
- MongoDB Atlas
- Render (Deployment)
- Bcrypt

## Project Structure

### Models
- Comment
- Meal
- User

### Middleware
- Route Guards:
- isLoggedIn
- isLoggedOut
- isAdmin

### Routes
- Auth Routes
- Index Routes
- Meals Routes
- User Routes

### Seeds
- Meals Seed

### Views
- Login
- Sign Up
- All Meals
- Edit Meal
- Meal Details
- Meal
- Menu
- New Meal
- All Users
- Edit User
- Profile
- User Details
- About
- Error
- Index
- Layout
- Not Found

## States
- Non-registered User
- Registered User
- Logged In As Admin

## Links
- [Trello Link](https://trello.com/b/HuhA0Bv3/ironhack-project-2)
- [GitHub Repository Link] (https://github.com/DIvanoski547/Restaurant-website)
- [Deployment Link] (https://restaurant-website-nw8x.onrender.com/)

## Contributors / Team

[David Ivanoski](https://github.com/DIvanoski547), [Kenneth Flanders](https://github.com/theflanders2)