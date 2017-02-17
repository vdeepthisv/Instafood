module.exports = function(app, auth, foodModel, userModel, multipart) {

  app.post("/api/project/user/:userId/item", auth, addFood);
  app.get("/api/project/item/variety", getVariety);
  app.post("/api/project/user/:userId/fooditemupload", auth, getItemByCook);
  app.get("/api/project/item/:itemId", auth, getItemById);
  app.delete("/api/project/item/:itemId", auth, deleteItemById);
  
  app.put("/api/project/item/:itemId", auth, updateItemById);
  
  app.get("/api/project/item", getChooseItemsFrom);
  app.get("/api/project/user/:userId/item", getChooseItemsFromForUser);
  
  app.get("/api/project/item/findfood/:keyword/variety/:varietyType", searchFood);
  

  function addFood(req, res) {
    var Object = req.body;
    console.log("Adding food request made");
    foodModel.addFood(req.params.userId, Object).then(function(newlyAddedFood) {
      console.log("Food added");
      userModel.updateItemByCook(req.params.userId, newlyAddedFood._id).then(function(updatedUser) {
        res.json(updatedUser);
      });
    });
  }

  function getVariety(req, res) {
    foodModel.getVariety().then(function(varieties) {
      res.json(varieties);
    });
  }

  function getItemByCook(req, res) {
    foodModel.getItemByCook(req.params.userId).then(function(foodItemsOfferedByUser) {
      res.json(foodItemsOfferedByUser);
    });
  }

  function getItemById(req, res) {
    foodModel.getItemById(req.params.itemId).then(function(food) {
      res.json(food);
    });
  }

  function deleteItemById(req, res) {
    foodModel.deleteItemById(req.params.itemId).then(function(food) {
      res.json(food);
    });
  }

  function updateItemById(req, res) {
    var Object = req.body;
     foodModel.updateItemById(req.params.itemId, Object).then(function(food) {
      res.json(food);
    });
  }

  function getChooseItemsFrom(req, res) {
    foodModel.getChooseItemsFrom().then(function(foodItems) {
      res.json(foodItems);
    });
  }

  function getChooseItemsFromForUser(req, res) {
    foodModel.getChooseItemsFromForUser(req.params.userId).then(function(foodItems) {
      res.json(foodItems);
    });
  }
 
  function searchFood(req, res) {
    console.log("Searching for this " +req.params.keyword);
    var keyword = req.params.keyword;
    var varietyType = req.params.varietyType;
    if(keyword == "emptyKeyword" && varietyType != "undefined") {
      foodModel.searchItemByVarietyType(varietyType).then(function(foodItems) {
        res.json(foodItems);
      });
    } else if(keyword != "emptyKeyword" && varietyType == "undefined") {
      foodModel.searchFood(keyword).then(function(foodItems) {
        res.json(foodItems);
      });
    } else if(keyword != "emptyKeyword" && varietyType != "undefined") {
      foodModel.searchInderOrVariety(keyword, varietyType).then(function(foodItems) {
        res.json(foodItems);
      });
    }
  }
};