"use strict";

(function () {

  angular
  .module("Instafood")
  .factory("UserService", UserService);

  function UserService($http, $q) {

    var service = {
      registerUser: registerUser,
      login: login,
      logout: logout,
      loggedin: loggedin,

      updateUser: updateUser,
    };
    return service;

    
    function registerUser(newUserObj) {
      var deferred = $q.defer();
      $http
      .post("/api/project/user/register", newUserObj)
      .success(function(response) {
        deferred.resolve(response);
      })
      .error(function(data, status){
        deferred.resolve(null);
      });
      return deferred.promise;      
    }

    function login(username, password) {
      var deferred = $q.defer();
      var credential = {username: username, password: password};
      $http
      .post("/api/project/user/login", credential)
      .success(function(res){
        deferred.resolve(res);
      })
      .error(function(data, status){
        deferred.resolve(null);
      });

      return deferred.promise;
    }

    function logout(){
      var deferred = $q.defer();
      $http.get("/api/project/user/logout")
      .success(function(res){
          deferred.resolve(res);
      });
      return deferred.promise;
    }

    function loggedin(){
      var deferred = $q.defer();
      $http.get("/api/project/user/loggedin")
          .success(function(res){
              deferred.resolve(res);
          });
      return deferred.promise;
    }

    // Updates the userObj by userId
    function updateUser(userid, updateUserObj) {
      var deferred = $q.defer();
      $http
      .put("/api/project/user/"+ userid, updateUserObj)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }
  }
})();