module.exports = function(mongoose) {

  var itemdata = mongoose.Schema({
    "title" : {type: String, index: true},
    "type": {type: String, enum: ["Vegan", "Meat", "Sea Food", "Desserts"], index: true},
    "variety": {type: String, enum: ["Italian", "Chinese", "Indian", "Mexican", "Vietnamese", "American", "Lebanese", "French", "Pakistani", "Thai"]},
    "cost": Number,
    "userId": String,
    "description": {type: String, index: true},
    "quantity": {type: Number, default: 1},
    "addedOn": {type: Date, default: Date.now},
    "image": String
  }, {collection: "food"});

  return itemdata;
}