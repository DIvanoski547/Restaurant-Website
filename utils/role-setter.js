function roleSetter(req, res, next){
    // Set the role to 'admin', 'moderator', or 'customer'
    // by getting the `role` attribute from the request headers
    req.user =  { role: req.get('role') };
    next();
}


module.exports = roleSetter;