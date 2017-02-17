(function () {
  "use strict";
  
  angular
  .module("Instafood")
  .controller("FoodController", FoodController);

  function FoodController($scope, $location, $rootScope, FoodService, cfpLoadingBar, ngDialog) {
    var model = this;
    model.user = $rootScope.user;
    model.foodDetails = foodDetails;
    init();

    function init() {
      cfpLoadingBar.start();
      if(model.user) {
        FoodService.getChooseItemsFromForUser(model.user._id).then(updateChooseItemsFrom);
      } else {
        FoodService.getChooseItemsFrom().then(updateChooseItemsFrom);
      }
      cfpLoadingBar.complete();
    }

    function updateChooseItemsFrom(foodItems) {
      model.foodItems = foodItems;
    }

    function foodDetails(itemId) {
      if($rootScope.user) {
        $location.url("/buy/" + itemId);
      } else {
        ngDialog.open({
          template: 'css/messages/login.html',
        });
      }
    }
  }
})();