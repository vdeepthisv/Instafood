"use strict";
(function () {

  angular
  .module("Instafood")
  .factory("PaymentService", PaymentService);

  function PaymentService($http, $q) {

    var service = {
      payForFood: payForFood
    }
    return service;

    function payForFood(token, order) {
      var deferred = $q.defer();
      $http
      .post("/api/project/client/payForFood/" + token.id, order)
      .success(function(response) {
        deferred.resolve(response);
      })
      .error(function(data, status){
        deferred.resolve("Failure");
      });
      return deferred.promise;
    }
  }
})();