"use strict";
(function () {
  
  angular
  .module("Instafood")
  .factory("OrderService", OrderService);

  function OrderService($http, $q) {

    var service = {
      getItemRequestedByUserId: getItemRequestedByUserId
    }
    return service;

    function getItemRequestedByUserId(userId) {
      var deferred = $q.defer();
      $http
      .get("/api/project/user/" + userId + "/orders")
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

  }
})();
