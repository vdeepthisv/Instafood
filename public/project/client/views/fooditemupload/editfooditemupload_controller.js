"use strict";
(function () {

  angular
  .module("Instafood")
  .controller("EditfooditemuploadController", EditfooditemuploadController);

  function EditfooditemuploadController($routeParams, cfpLoadingBar, $location, $rootScope, FoodService, $scope, Upload, $timeout, ngDialog) {
    var model = this;
    var user = $rootScope.user;
    var itemId = $routeParams.itemId;
    model.update = update;
    var image, resizedImage;
    init()

    function init() {
      
      cfpLoadingBar.start();
      FoodService.getVarieties().then(function(varieties) {
        model.varieties = varieties;
      });
      if(itemId) {
        
        $rootScope.itemId = null;
        FoodService.getItemById(itemId).then(function(food) {
          if(user._id === food.userId) {
            console.log("trying to edit food" + food); 
            model.food = food;
            console.log(model.food.variety);
          } else {
            ngDialog.open({
              template: 'css/messages/updatesucess.html',
            });
            $location.url("/fooditemupload");
          }
        });
      } else {
        ngDialog.open({
          template: 'css/messages/fail.html',
        });
        $location.url("/login");
      }
      cfpLoadingBar.complete();
    }

    function update(newObject) {
      if(image != undefined && resizedImage != undefined) {
        newObject.image = resizedImage;
        FoodService.updateItemById(itemId, newObject).then(function(updatedFood) {
          $rootScope.itemId = null;
          ngDialog.open({
            template: 'css/messages/imageupload.html',
          });
          $location.url("/fooditemupload");
        });
      } else {
        ngDialog.open({
          template: 'css/messages/imageupload.html',
        });
      }
    }

    function home() {
      $rootScope.itemId = null;
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