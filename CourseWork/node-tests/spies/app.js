var db = require('./db.js');

module.exports.handleSignup = (email, password) => {
  // check email exits
  db.saveUser({email, password});
  // send welcome email
};
