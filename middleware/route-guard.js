// middleware/route-guard.js

// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/login');
    }
    next();
};
  
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect('/');
    }
    next();
};

// checks if the user has admin rights
const isAdmin = (req, res, next) => {
  if (req.session.currentUser.role != "admin") {
    console.log("User needs admin rights to access this route.");
    return res.redirect('/login');
  }
  next();
};

// checks if the user has admin or moderator rights
const isAdminOrModerator = (req, res, next) => {
  if (req.user.role != "admin" && req.user.role != "moderator") {
    console.log("User needs admin or moderator rights to access this route.");
    return res.redirect('/login');
  }
  next();
};
  
module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdmin,
    isAdminOrModerator
};
  