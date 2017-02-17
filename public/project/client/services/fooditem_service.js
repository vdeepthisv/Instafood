"use strict";
(function () {
  
  angular
  .module("Instafood")
  .factory("FoodService", FoodService);

  function FoodService($http, $q) {

    var service = {
      addFood: addFood,
      getVarieties : getVarieties,      
      getItemById: getItemById,
      
      deleteItemById: deleteItemById,
      getItemByCook: getItemByCook,
      
      updateItemById: updateItemById,

      // Home page- display food
      getChooseItemsFrom: getChooseItemsFrom,
      getChooseItemsFromForUser: getChooseItemsFromForUser,
      // Search Food
      searchFood: searchFood
    };
    return service;

    // Takes userId, food. Adds userId, guid to food and adds
    // this food to existing foodItems. 
    function addFood(userId, Object) {
      var deferred = $q.defer();
      $http.post("/api/project/user/" + userId + "/item", Object)
      .success(function(res){
        deferred.resolve(res);
      });
      return deferred.promise;
    }


    function getVarieties() {
      var deferred = $q.defer();
      $http
      .get("/api/project/item/variety")
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    // Get all foodItems offered by user
    function getItemByCook(userId) {
      var deferred = $q.defer();
      $http
      .post("/api/project/user/" + userId + "/fooditemupload")
      .success(function(foodItems) {
        deferred.resolve(foodItems);
      })
      return deferred.promise;
    }

    // Get foodItem by Id
    function getItemById(itemId) {
      var deferred = $q.defer();
      $http
      .get("/api/project/item/" + itemId)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    // Delete food by Id
    // Only owner of the food shd be able to delete
    function deleteItemById(itemId) {
      var deferred = $q.defer();
      $http
      .delete("/api/project/item/" + itemId)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }
    
    // Gets all the food items that are available for 
    // users to order in the home page
    function getChooseItemsFrom() {
      var deferred = $q.defer();
      $http
      .get("/api/project/item")
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    // Gets all the food items that are available for 
    // users to order in the home page
    function getChooseItemsFromForUser(userId) {
      var deferred = $q.defer();
      $http
      .get("/api/project/user/" + userId +"/item")
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    // Update the food using itemId
    function updateItemById(itemId, newObject) {
      // var deferred = $q.defer();
      // $http({
      //   method: 'PUT',
      //   url: '/api/project/item/' + itemId,
      //   headers: {'Content-Type': undefined},
      //   data: newObject,      
      //   transformRequest: function (data, headersGetter) {
      //     var formData = new FormData();
      //     angular.forEach(data, function (value, key) {
      //         formData.append(key, value);
      //     });

      //     var headers = headersGetter();
      //     console.log(headers);
      //     delete headers['Content-Type'];

      //     return formData;
      //   }
      // }).success(function(response) {
      //   console.log(response);
      //   deferred.resolve(response);
      // })
      // .error(function(data, status){
      //   deferred.resolve("Failure");
      // });
      // return deferred.promise;
      var deferred = $q.defer();
      $http
      .put("/api/project/item/" + itemId, newObject)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    function searchFood(keyword, varietyType) {
      var deferred = $q.defer();
      $http
      .get("/api/project/item/findfood/" + keyword + "/variety/" +varietyType)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }
  }
})();