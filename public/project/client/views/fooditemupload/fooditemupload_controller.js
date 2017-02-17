"use strict";
(function () {
 
  angular
  .module("Instafood")
  .controller("fooditemuploadController", fooditemuploadController)
  .directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                $(element).tooltip('show');
            }, function(){
                $(element).tooltip('hide');
            });
        }
    };
});

  function fooditemuploadController($scope, cfpLoadingBar, $routeParams, $location, $rootScope, FoodService, ngDialog) {
    var model = this;
    var user = $rootScope.user;
    model.deleteFood = deleteFood;
    model.editFood = editFood;
    init();

    function init() {
      cfpLoadingBar.start();
      model.food = {};
      $routeParams.itemId = {};
      FoodService.getItemByCook(user._id).then(function(foodItems) {
        model.foodItems = foodItems;        
      });
      cfpLoadingBar.complete();
    }

    function deleteFood(itemId) {
      if(itemId) {
        FoodService.deleteItemById(itemId).then(function(food) {
        ngDialog.open({
            template: 'css/messages/deletefood.html',
        });
        init();
        });
      }
    }

    function editFood(itemId) {
      if(itemId) {
        $rootScope.itemId = itemId;
        $location.url("/editfooditemupload/" + itemId);
      }
    }

    function home() {
      $location.url("/item");
      $routeParams.itemId = {};
    }

    function loggedInUser(userObj) {
      if(userObj != null) {
        $rootScope.user = userObj;
        $location.url("/myaccount");
      }
    }
  }

})();