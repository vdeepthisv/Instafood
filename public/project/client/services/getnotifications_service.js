"use strict";
(function () {
  
  angular
  .module("Instafood")
  .factory("NotificationService", NotificationService);

  function NotificationService($http, $q) {

    var service = {
      getNotificationForUser: getNotificationForUser,
      deliverFood: deliverFood
    }
    return service;

    // Returns notifications for user
    function getNotificationForUser(userId) {
      var deferred = $q.defer();
      $http
      .get("/api/project/user/" + userId + "/notification" )
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    // Updates the order status to delevired
    function deliverFood(orderId, notificationId) {
      var deferred = $q.defer();
      $http
      .put("/api/project/user/" + notificationId + "/deliveredFood/" + orderId)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

  }
})();