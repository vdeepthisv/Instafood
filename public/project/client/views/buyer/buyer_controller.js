(function () {
  "use strict";

  angular
  .module("Instafood")
  .controller("BuyerController", BuyerController)
  .directive('googlePlaces', function(){
    return {
      restrict:'E',
      replace:true,
      
      scope: {location:'='},
      template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level"/>',
      link: function($scope, elm, attrs){
        var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();
          $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
          $scope.$apply();
        });
      }
    }
  });

  function BuyerController($scope, $routeParams, $location, $rootScope, FoodService, PaymentService, ngDialog) {
    var model = this;
   
    model.home = home;    
    
    model.doCheckout = doCheckout;

    var user = $rootScope.user;
    var itemId = $routeParams.itemId;
    
    init();
    function init() {
      model.food = {};
      $routeParams.itemId = {};
      FoodService.getItemById(itemId).then(function(food) {
        ngDialog.open({
          template: 'css/messages/carddetailsformat.html',
        });
        console.log(food);
        model.food = food;        
      });
    }
    
    function doCheckout(token) {
      
      if($scope.location != undefined && $scope.location != "") {
        var order = { sellerId: model.food.userId, buyerId: user._id, itemId: model.food._id, location: $scope.location,
                      comments: model.food.comments, cost: model.food.cost} ;
        if(order.sellerId === order.buyerId) {
          ngDialog.open({
            template: 'css/messages/ownfoodorder.html',
          });
        } else {
          ngDialog.open({
            template: 'css/messages/inprogress.html',
          });
          PaymentService.payForFood(token, order).then(function(response) {
            if(response == "Failure") {
              ngDialog.open({
                template: 'css/messages/fail.html',
              });
            } else {
              ngDialog.open({
                template: 'css/messages/successfulorder.html',
              });
              $location.url("/buyfoodhistory");
            }
          });
        }
      } else {
        ngDialog.open({
          template: 'css/messages/enterAddress.html',
        });
      }

    };

    function home() {
      $location.url("/item");
    }
    
    $scope.location = '';

    $scope.doSearch = function(){
      if($scope.location === ''){
        alert('Directive did not update the location property in parent controller.');
      } else {
        alert('Location: ' + $scope.location);
      }
    };
  }
})();