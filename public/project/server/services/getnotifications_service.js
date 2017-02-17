module.exports = function(app, auth, userModel, notificationModel, orderModel) {

  app.get("/api/project/user/:userId/notification", auth, getNotificationForUser);
  app.put("/api/project/user/:notificationId/deliveredFood/:orderId", auth, deliverFood);

  function getNotificationForUser(req, res) {
    userModel.findUserById(req.params.userId).then(function(user) {
      notificationModel.getNotificationForUser(user.sales).then(function(notifications) {
        res.json(notifications);  
      })
    });
  }

  function deliverFood(req, res) {
    orderModel.updateItemCondition(req.params.orderId).then(function(order) {
      notificationModel.updateItemCondition(req.params.notificationId).then(function(notifications) {
        res.json(notifications);
      })
    })
  }
 
};