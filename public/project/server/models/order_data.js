module.exports = function(mongoose) {

  var orderdata = mongoose.Schema({
    "sellerId": String,
    "buyerId" : String,
    "itemId": String,
    "location": String,
    "comments": String,
    "status": {type: Boolean, default: false}, 
    "orderDate": {type: Date, default: Date.now},
    "deliveryTime": Date,
  }, {collection: "order"});

  return orderdata;
}