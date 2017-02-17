(function () {
  "use strict";
  
  angular
  .module("Instafood")
  .controller("ProfileController", ProfileController);

  function ProfileController($location, $rootScope, UserService, ngDialog) {
    var model = this;
    model.update = update;
    model.back = back;
    model.genders = ["Male", "Female"];
    var user = $rootScope.user;
    
    userLoggedin();

    function update(updatedUserObj) {
      if(user) {
        var userid = user._id;
        UserService.updateUser(userid, updatedUserObj).then(updatedUser);
      } else {
        userLoggedin();
      }
    }

    function userLoggedin() {
      if(user == null) {
        ngDialog.open({
          template: 'css/messages/login.html',
        });
      } else {
        
        model.user = {};
        model.user = user;
        console.log("Gender value = " + model.user.gender);
      }
    }

    function back() {
      $location.url("/item");
    }

    function updatedUser(userObj) {
      if(userObj != null) {
        ngDialog.open({
          template: 'css/messages/updatesuccess.html',
        });
        $rootScope.user = userObj;
        $location.url("/myaccount");
      }
    }

  }

})();