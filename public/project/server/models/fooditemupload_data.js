module.exports = function(mongoose) {

  var fooditemuploadSchema = mongoose.Schema({
    "userName": String,
    "itemId": String,
    "foodName": String,
    "foodType": String,
    "foodVariety": String,
    "orderDate": Date,
    "alreadyDelivered": Boolean
  });

  return fooditemuploadSchema;
}