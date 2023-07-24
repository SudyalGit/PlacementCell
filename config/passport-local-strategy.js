const passport = require('passport');
const User = require('../models/employee');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .exec() // Use exec() to get a promise
        .then((use) => {
          if (!use || use.password !== password) {
            console.log('Invalid Username/Password');
            return done(null, false);
          }
          return done(null, use);
        })
        .catch((err) => {
          console.log('Error in finding user --> Passport');
          return done(err);
        });
    }
  )
);

passport.serializeUser(function (use, done) {
  done(null, use.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .exec() // Use exec() to get a promise
    .then((use) => {
      return done(null, use);
    })
    .catch((err) => {
      console.log('Error in finding user --> Passport');
      return done(err);
    });
});

passport.checkAuthentication = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  return res.redirect('/employee/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
  if(req.isAuthenticated()){
    res.locals.user = req.user;
  }
  next();
}

module.exports = passport;
