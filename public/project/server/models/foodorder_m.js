"use strict";

module.exports = function(app, mongoose) {

  var q = require("q");
  var displayinfo = require("./foodorder_data.js")(mongoose);
  var notificationModel = mongoose.model("Notification", displayinfo);

  var api = {
    createNotification: createNotification,
    getNotificationForUser: getNotificationForUser,
    updateItemCondition: updateItemCondition
  }
  return api;


  function createNotification(notificationObj) {
    var deffered = q.defer();
    notificationModel.create(notificationObj, function(err, food){
      if(err) {
        console.log("create notification called");
        deffered.reject(err);
      } else {
        deffered.resolve(food);
      }
    });
    return deffered.promise;      
  }

  function getNotificationForUser(orderIds) {
    var deffered = q.defer();
    notificationModel.find({orderId: {$in : orderIds}, status: false}).sort({orderDate: 'desc'}).find(function(err, food){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(food);
      }
    });
    return deffered.promise;  
  }

   function updateItemCondition(notificationId) {
    var deferred = q.defer();
    notificationModel.findById(notificationId, function(err, notification) {
      if(err) {
        deferred.reject(err);
      } else {
        notification.status = true;
        notification.save(function(error, result) {
          deferred.resolve(result);
        });
      }
    });
    return deferred.promise;
  }
};