"use strict";

module.exports = function(app, auth, mongoose, nodemailer, passport, localStrategy, multipart, GoogleStrategy) {

  var userModel = require("./models/user_m.js")(app, mongoose);
  var foodModel = require("./models/item_m.js")(app, mongoose);
  var orderModel = require("./models/order_m.js")(app, mongoose);
  var notificationModel = require("./models/foodorder_m.js")(app, mongoose);
  require("./services/profile_user_service.js")(app, auth, userModel, passport, localStrategy, GoogleStrategy);
  require("./services/fooditem_service.js")(app, auth, foodModel, userModel, multipart);
  require("./services/food_order_service.js")(app, auth, orderModel, userModel, foodModel);
  require("./services/payforfood_service.js")(app, auth, nodemailer, orderModel, userModel, foodModel, notificationModel);
  require("./services/getnotifications_service.js")(app, auth, userModel, notificationModel, orderModel);
};