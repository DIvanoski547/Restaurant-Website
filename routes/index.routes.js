const express = require('express');
const router = express.Router();

/*-----GET HOME PAGE-----*/
router.get("/", (req, res, next) => {
  res.render("index", { userInSession: req.session.currentUser });
});

/*-----GET ABOUT PAGE-----*/
router.get("/about", (req, res, next) => {
  res.render("about", { userInSession: req.session.currentUser });
});

module.exports = router;
