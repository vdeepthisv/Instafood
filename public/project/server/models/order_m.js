"use strict";

module.exports = function(app, mongoose) {

  var q = require("q");
  var orderdata = require("./order_data.js")(mongoose);
  var orderModel = mongoose.model("Order", orderdata);

  var api = {
    itemSelect: itemSelect,
    getBuyerFood: getBuyerFood,
    updateItemCondition: updateItemCondition
  }
  return api;

  
  function itemSelect(order) {
    var deffered = q.defer();
    orderModel.create(order, function(err, order){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(order);
      }
    });
    return deffered.promise;      
  }

  
  function getBuyerFood(userId) {
     var deffered = q.defer();
    orderModel.find({buyerId: userId}).sort({orderDate: -1}).find(function(err, orders){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(orders);
      }
    });
    return deffered.promise;      
  }

  function updateItemCondition(orderId) {
    var deferred = q.defer();
    orderModel.findById(orderId, function(err, order) {
      if(err) {
        deferred.reject(err);
      } else {
        order.status = true;
        order.save(function(error, result) {
          deferred.resolve(result);
        });
      }
    });
    return deferred.promise;
  }
}