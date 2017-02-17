"use strict";
(function () {
  angular
  .module("Instafood")
  .controller("OrderController", OrderController);

  function OrderController($scope, $location, $rootScope, OrderService, cfpLoadingBar) {

    var model = this;
    var user = $rootScope.user;
    init();

    function init() {
      cfpLoadingBar.start();
      OrderService.getItemRequestedByUserId(user._id).then(function(foodItems) {
        console.log("display all items");
        model.foodItems = foodItems;
      });
      cfpLoadingBar.complete();
    } 
  }
})();