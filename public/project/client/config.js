(function() {
  "use strict";
  
  angular
    .module("Instafood")
    .config(Configure);

  function Configure($routeProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
    // Stripe.setPublishableKey('pk_test_E0oNL29chPrz1RqTKP73fGP2');
    $routeProvider
      .when("/item", {
            templateUrl: "views/item/item_view.html",
            controller: "FoodController",
            controllerAs: "model"
      })
      .when("/myaccount", {
            templateUrl: "views/myaccount/myaccount_v.html",
            controller: "ProfileController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .when("/findfood", {
            templateUrl: "views/findfood/findfood_v.html",
            controller: "SearchController",
            controllerAs: "model"
      })
      .when("/sellfood", {
            templateUrl: "views/sellfood/sellfood_v.html",
            controller: "SellerController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .when("/displayinfo", {
            templateUrl: "views/displayinfo/displayinfo_v.html",
            controller: "NotificationController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .when("/buy/:itemId", {
            templateUrl: "views/buyer/buyer_v.html",
            controller: "BuyerController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .when("/register", {
            templateUrl: "views/register/register_v.html",
            controller: "RegisterController",
            controllerAs: "model"
      })
      .when("/buyfoodhistory", {
            templateUrl: "views/buyfoodhistory/buyfoodorderhistory_v.html",
            controller: "OrderController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .when("/login", {
            templateUrl: "views/login/userlogin_v.html",
            controller: "LoginController",
            controllerAs: "model"
      })
      .when("/fooditemupload", {
            templateUrl: "views/fooditemupload/fooditemupload_v.html",
            controller: "fooditemuploadController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .when("/editfooditemupload/:itemId", {
            templateUrl: "views/fooditemupload/editfooditemupload_v.html",
            controller: "EditfooditemuploadController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .otherwise({
        redirectTo: "/item"
      });
  }

  function loggedin ($rootScope, $location, UserService, ngDialog) {
    UserService.loggedin().then(function(user){
        if (user !== '0') {
          $rootScope.user = user;
        } else {
          ngDialog.open({
            template: 'css/messages/login.html',
          })
          $location.url('/login');
        }
    }, function(err){
        ngDialog.open({
          template: 'css/messages/fail.html',
        })
        $location.url('/login');
    });
  }

})();