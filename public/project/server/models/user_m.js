"use strict";

module.exports = function(app, mongoose) {

  var q = require("q");
  var userSchema = require("./user_data.js")(mongoose);
  var model = mongoose.model("User",userSchema);
 
  var api = {
    createUser: createUser,
    findUserById: findUserById,
    updateUser: updateUser,
    findUserByCredentials: findUserByCredentials,
    findUserByUsernameAndPassword: findUserByUsernameAndPassword,
    googleLogin: googleLogin,
    
    updateItemByCook: updateItemByCook,
    // Order
    updateItemDetailsForUser: updateItemDetailsForUser,
    updateBuyerInfo: updateBuyerInfo
  }
  return api;

  
  function createUser(newUser) {
    var deferred = q.defer();
    
    model.findOne({username: newUser.username}, function(err, user) {
      if(err) { 
        deferred.reject(err);
      }
      
      else if(user) { 
        deferred.resolve(null);
      } else {
        model.create(newUser, function(err, result) {
          if(err) {
            deferred.reject(err);
          } else {
            deferred.resolve(findUserByUsernameAndPassword(newUser.username, newUser.password));
          }
        });
      }
    });    
    return deferred.promise;
  }

  function findUserById(userId) {
    var deferred = q.defer();
    model.findById(userId, function(err, user) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(user);
      }
    });
    return deferred.promise;
  }

  
  function updateUser(userId, updatedUser) {
    var deferred = q.defer();
    delete updatedUser._id;
    model.update({_id: userId}, {$set: updatedUser}, function(err, result) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(findUserById(userId));
      }
    });
    return deferred.promise;
  }

  function findUserByCredentials(credentails) {
    return findUserByUsernameAndPassword(credentails.username, credentails.password);
  }

  function findUserByUsernameAndPassword(username, password) {
    var deferred = q.defer();
    model.findOne({username: username, password: password}, function(err, result) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  }

  function googleLogin(profileInfo) {
    console.log(profileInfo);
    var deferred = q.defer();
    model.find({googleId: profileInfo.id}, function(err, doc) {
      var user = null;
      if(err) {
        deferred.reject(err);
      } else {

          if(doc && doc.length > 0) {
            console.log("Found user with googleId");
            user = doc[0];
          } else {
            user = new model();
            console.log("Did not find a user with googleId");
          }
          user.firstName = profileInfo.name.givenName; 
          user.lastName = profileInfo.name.familyName;
          user.username = String(profileInfo.emails[0].value).split('@')[0];
          user.gender = profileInfo.gender;
          user.googleId = profileInfo.id;
          user.email = String(profileInfo.emails[0].value);
          user.save(function(err, doc) {
            console.log("Saved google user");
            deferred.resolve(user);
          })
        }
    });
    return deferred.promise;
  }

  function updateItemByCook(userId, itemId) {
    var deferred = q.defer();
    model.findById(userId, function(err, user) {
      if(err) {
        deferred.reject(err);
      } else {
        user.fooditemupload.push(itemId);
        user.save(function(error, result) {
          deferred.resolve(result);
        });
      }
    });
    return deferred.promise;
  } 

  
  function updateItemDetailsForUser(userId, orderId) {
    var deferred = q.defer();
    model.findById(userId, function(err, user) {
      if(err) {
        deferred.reject(err);
      } else {
        console.log("update in user model");
        user.orders.push(orderId);
        user.save(function(error, result) {
          deferred.resolve(result);
        });
      }
    });
    return deferred.promise;
  }

  function updateBuyerInfo(userId, orderId) {
    var deferred = q.defer();
    model.findById(userId, function(err, user) {
      if(err) {
        deferred.reject(err);
      } else {
        console.log("update in user model");
        user.sales.push(orderId);
        user.save(function(error, result) {
          deferred.resolve(result);
        });
      }
    });
    return deferred.promise;
  }

}