"use strict";

module.exports = function(app, mongoose) {

  var q = require("q");
  var itemdata = require("./item_data.js")(mongoose);
  var foodModel = mongoose.model("Food", itemdata);

  var api = {
    getVariety: getVariety,
    addFood: addFood,
    getItemByCook: getItemByCook,
    getItemById: getItemById,
    deleteItemById: deleteItemById,
    
    updateItemById: updateItemById,
    
    updateQuantity: updateQuantity, 
    getFoodWithIds:getFoodWithIds,
  
    getChooseItemsFrom: getChooseItemsFrom,
    getChooseItemsFromForUser: getChooseItemsFromForUser,
    
    searchFood: searchFood,
    searchItemByVarietyType: searchItemByVarietyType,
    searchInderOrVariety: searchInderOrVariety
  }
  return api;

  
  function getVariety() {
    var deffered = q.defer();
    deffered.resolve(foodModel.schema.path('variety').enumValues);
    return deffered.promise;
  }

  
  function addFood(userId, newObject) {
    var deffered = q.defer();
    newObject.userId = userId;
    foodModel.create(newObject, function(err, food){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(food);
      }
    });
    return deffered.promise;      
  }

  
  function getItemByCook(userId) {
    var deffered = q.defer();
    foodModel.find({userId: userId}).sort({addedOn: -1}).find(function(err, food){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(food);
      }
    });
    return deffered.promise;  
  }

  function getItemById(itemId) {
    var deffered = q.defer();
    foodModel.findById(itemId, function(err, food){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(food);
      }
    });
    return deffered.promise;  
  }

  function deleteItemById(itemId) {
    var deffered = q.defer();
    foodModel.remove({_id: itemId}, function(err, food){
      if(err) {
        console.log("Deleted food" +  food);;
        deffered.reject(err);
      } else {
        deffered.resolve(food);
      }
    });
    return deffered.promise;  
  }

  function updateItemById(itemId, newObject) {
    var deferred = q.defer();
    delete newObject._id;
    foodModel.update({_id: itemId}, {$set: newObject}, function(err, result) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  }

  
  function updateQuantity(itemId) {
    var deferred = q.defer();
    foodModel.findById(itemId, function(err, food) {
      if(err) {
        deferred.reject(err);
      } else {
        food.quantity = food.quantity - 1;
        food.save(function(error, result) {
          deferred.resolve(result);
        });
      }
    });
    return deferred.promise;
  }

  function getChooseItemsFrom() {
    var deferred = q.defer();
    foodModel.find({quantity: {$gt: 0}}).sort({addedOn: -1}).find(function(err, foodItems) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(foodItems);
      }
    });
    return deferred.promise;
  }

  function getChooseItemsFromForUser(userId) {
    var deferred = q.defer();
    foodModel.find({$and: [{userId: {$ne: userId}}, {quantity: {$gt: 0}}]}).sort({addedOn: -1}).find(function(err, foodItems) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(foodItems);
      }
    });
    return deferred.promise;
  }

  function getFoodWithIds(arrayIds) {
    var deffered = q.defer();
    foodModel.find({_id: {$in : arrayIds}}).sort({addedOn: -1}).find(function(err, food){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(food);
      }
    });
    return deffered.promise;  
  }

  function searchFood(keyword) {
    console.log("Search by keywrd " + keyword);
    var deferred = q.defer();
    foodModel.find({quantity: {$gt: 0}})
              .find({$or: [ {title: {$regex: keyword, $options: "i"}}, 
                            {description: {$regex: keyword, $options: "i"} }
                          ]})
              .sort({addedOn: -1})
              .find(function(err, foodItems) {
                if(err) {
                  deferred.reject(err);
                } else {
                  deferred.resolve(foodItems);
                }
              });
    return deferred.promise;
  }

  function searchItemByVarietyType(varietyType) {
    console.log("Search by varietyType " +varietyType);
    var deferred = q.defer();
    foodModel.find({quantity: {$gt: 0}})
              .find({variety: varietyType})
              .sort({addedOn: -1})
              .find(function(err, foodItems) {
                if(err) {
                  deferred.reject(err);
                } else {
                  deferred.resolve(foodItems);
                }
              });
    return deferred.promise;
  }

  function searchInderOrVariety(keyword, varietyType) {
    console.log("Search by varietyType " +varietyType + " keywrd " + keyword);
    var deferred = q.defer();
    foodModel.find({quantity: {$gt: 0}})
              .find({$or: [ {title: {$regex: keyword, $options: "i"}}, 
                            {description: {$regex: keyword, $options: "i"}},
                            {variety: varietyType}
                          ]})
              .sort({addedOn: -1})
              .find(function(err, foodItems) {
                if(err) {
                  deferred.reject(err);
                } else {
                  deferred.resolve(foodItems);
                }
              });
    return deferred.promise;
  }

}