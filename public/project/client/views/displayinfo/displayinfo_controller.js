"use strict";
(function () {
 
  angular
  .module("Instafood")
  .controller("NotificationController", NotificationController);

  function NotificationController($scope, $location, $rootScope, NotificationService, ngDialog) {
    var model = this;
    var user = $rootScope.user;
    model.deliverFood = deliverFood;
    init();

    $scope.predicate = 'orderDate';
    $scope.reverse = true;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    function deliverFood(orderId, notificationId) {
      NotificationService.deliverFood(orderId, notificationId).then(function(notifications) {
        init();
      })
    }

    function init() {
      if(user) {
        NotificationService.getNotificationForUser(user._id).then(function(notifications) {
          model.notifications = notifications;
        });
      } else {
        ngDialog.open({
          template: 'css/messages/login.html',
        });
        $location.url("/login");
      }
    }

  }
})();
