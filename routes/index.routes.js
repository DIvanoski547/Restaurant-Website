const express = require('express');
const router = express.Router();

/*-----GET HOME PAGE-----*/
// route to display home page and check whether a user is currently logged in
router.get("/", (req, res, next) => {
  res.render("index", { userInSession: req.session.currentUser });
});

/*-----GET ABOUT PAGE-----*/
// route to display about page and check whether a user is currently logged in
router.get("/about", (req, res, next) => {
  res.render("about", { userInSession: req.session.currentUser });
});

module.exports = router;
