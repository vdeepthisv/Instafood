"use strict";
(function () {

  angular
  .module("Instafood")
  .controller("SellerController", SellerController);

  function SellerController($location, $rootScope, $scope, Upload, $timeout, FoodService, ngDialog) {
    var model = this;
    var user = $rootScope.user;

    model.back = back;
    model.addFood = addFood;
    var image, resizedImage;

    getVarieties();
   
    function getVarieties() {
      FoodService.getVarieties().then(function(varieties) {
        model.varieties = varieties;
      });
    }

    function addFood(newObject) {
      if(image != undefined && resizedImage != undefined) {
        newObject.image = resizedImage;
        FoodService.addFood(user._id, newObject).then(updatedLoggedInUser);
      } else {
        ngDialog.open({
          template: 'css/messages/imageupload.html',
        });
      }
    }

    function updatedLoggedInUser(user) {
      if(user != null && user != "Failure") {
        $rootScope.user = user;
        var userId = user._id;
        ngDialog.open({
          template: 'css/messages/foodupload.html',
        });
        $location.url("/fooditemupload");
      } else {
        ngDialog.open({
          template: 'css/messages/fail.html',
        });
      }
    }

    function back() {
      $location.url("/item");
    }

    
    $scope.imageChanged = ImageChanged
    function ImageChanged(element){
      var fileDisplayArea = document.getElementById('display');
      image = undefined;
      fileDisplayArea.innerHTML = "";

      if(element.files[0] == undefined || element.files[0] == null)
        return;

      var name = element.files[0].name;

      if(name.length <= 4)
        alert("The input is invalid");
      else{
        var extension = name.substring(name.length -3, name.length).toLowerCase()
        if(extension != "jpg" && extension != 'png')
          ngDialog.open({
          template: 'css/messages/imageupload.html',
        });
        else {
          var file = element.files[0];
          var reader = new FileReader();

          reader.onload = function(e) {
            var img = new Image(600,400);
            image = reader.result;
            img.src = image;
            img.className = "big-icon";
            fileDisplayArea.appendChild(img);
            resizedImage = imageToDataUri(img, 600, 400);
          }
          reader.readAsDataURL(file);
        }
      }
    }


    
    function imageToDataUri(img, width, height) {

      
      var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

      
      canvas.width = width;
      canvas.height = height;

      
      ctx.drawImage(img, 0, 0, width, height);

      
      return canvas.toDataURL();
    }


  }
})();