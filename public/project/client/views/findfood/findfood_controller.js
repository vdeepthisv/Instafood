(function () {
  "use strict";
  
  angular
    .module("Instafood")
    .controller("SearchController", SearchController);

  function SearchController($location, cfpLoadingBar, FoodService, ngDialog, $rootScope) {
    var model = this;
    model.searchFood = searchFood;
    model.foodItems = null;
    model.foodDetails = foodDetails;

    getVarieties();   
    function getVarieties() {
      FoodService.getVarieties().then(function(varieties) {
        model.varieties = varieties;
      });
    }

    function searchFood(keyword, varietyType) {
      cfpLoadingBar.start();
      console.log(varietyType);
      console.log(keyword);
      if(keyword == undefined && varietyType == undefined) {
        ngDialog.open({
          template: 'css/messages/searchfood.html',
        });
      } else {
        if(keyword == undefined || keyword == "") {
          keyword = "emptyKeyword";
        }
        FoodService.searchFood(keyword, varietyType).then(function (foodItems) {
          console.log(foodItems);
          model.foodItems = foodItems;
        });
      }
      cfpLoadingBar.complete();
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

    model.predicate = 'orderDate';
    model.reverse = true;
    model.sort = function(predicate) {
      model.reverse = (model.predicate === predicate) ? !model.reverse : false;
      model.predicate = predicate;
    };
  }
})();