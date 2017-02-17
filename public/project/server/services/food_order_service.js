module.exports = function(app, auth, orderModel, userModel, foodModel) {
  app.get("/api/project/user/:userId/orders", auth, getItemRequestedByUser);
 


  function getItemRequestedByUser(req, res) {
    orderModel.getBuyerFood(req.params.userId).then(function(orderItems) {

      var itemId = [];
      for(var i in orderItems) {
        itemId.push(orderItems[i].itemId);
      };

      var orderedFoodItems = [];
      foodModel.getFoodWithIds(itemId).then(function(foodItems) {
        for(var j in orderItems) {
          for(var k in foodItems) {
            if(orderItems[j].itemId === foodItems[k].id) {
              var orderedItem = {
                "cost" : foodItems[k].cost,
                "title": foodItems[k].title,
                "description": foodItems[k].description,
                "orderDate": orderItems[j].orderDate,
                "image": foodItems[k].image,
                "variety": foodItems[k].variety
              }
              orderedFoodItems.push(orderedItem);
            }
          }
        }
        res.json(orderedFoodItems); 
      });
    });
  }
};