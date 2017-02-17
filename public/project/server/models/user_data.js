module.exports = function(mongoose) {

   var bcrypt = require('bcryptjs');

    SALT_WORK_FACTOR = 10;


   var userSchema = mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "username": String,
    "password": String,
    "gender": String,
    "email": String,
    "rating": {type: Number, max: 5, default: 1},
    "address": String,
    "googleId": String,
    "image": String,
    
    "sales": [String],
    
    "orders": [String],
    
    "fooditemupload": [String]
  }, {collection: "user"});
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("password", salt, function(err, hash) {
        
        });
    });

  return userSchema;
}