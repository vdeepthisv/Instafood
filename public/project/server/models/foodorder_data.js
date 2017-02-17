module.exports = function(mongoose) {

  var info_items = mongoose.Schema({
    "itemId": String,
    "orderId" : String,
    "user": String,
    "userInfo": String,
    "title": String,
    "cost": Number,
    "comments": {type: String, default: 'no comments'},
    "orderDate": {type: Date, default: Date.now},
    "status": {type: Boolean, default: false}
  }, {collection: "foodorder"});

  return info_items;
}