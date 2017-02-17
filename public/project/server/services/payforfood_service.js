
module.exports = function(app, auth, nodemailer, orderModel, userModel, foodModel, notificationModel) {
  app.post("/api/project/client/payForFood/:tokenId", auth, payForFood);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "instafoodwebsite@gmail.com",
        pass: "iwsproject" //gmail password
    }
});


  function payForFood(req, res) {
	//var Client = require('coinbase').Client;
	//var client = new Client({'apiKey': mykey, 'apiSecret': mysecret});
    var stripe = require("stripe")("sk_test_Mushy4HlJjjzleZRMfkwhlQL");
    var order = req.body;
    var tokenId = req.params.tokenId;
      stripe.charges.create({
        amount: order.cost * 1000,
        currency: "usd",
        source: tokenId, 
        description: order.sellerId + " " + order.buyerId
      }, function(err, charge) {
          if(err) {
            res.json("Failure");
          } else {
            var buyer, seller;
            orderModel.itemSelect(req.body).then(function(order) {
              
              userModel.updateItemDetailsForUser(order.buyerId, order._id).then(function(buyer) {
                buyer = buyer;
                userModel.updateBuyerInfo(order.sellerId, order._id).then(function(seller) {
                 
                  seller = seller;
                  foodModel.updateQuantity(order.itemId).then(function(food) {
                    var notication = {
                      itemId: order.itemId, orderId: order.id, user: buyer.firstName + " " + buyer.lastName,
                      userInfo: buyer.email, title: food.title, cost: order.cost,
                      comments: order.comments, orderDate: order.orderDate, status : order.status
                    }
                    notificationModel.createNotification(notication).then(function(response) {

                      var subject = "Insta Food notification for item - " + food.title;
                      var content = "Food order was placed for item " + food.title + " by  " + buyer.firstName + " " + buyer.lastName + ".Email Information: " + buyer.email + ".Delivery address:" + order.location;
                      var salutation = '<p>Regards, <br/> InstaFood</p>'
                      var mailOptions = {
                        from: 'Insta Food <instafoodwebsite@gmail.com>',
                        to: seller.email,
                        cc: buyer.email,
                        subject: subject,
                        text: content,
                        html: '<p>Food order was placed for item ' + food.title + ' by  '+ buyer.firstName + ' ' + buyer.lastName + '.</p><ul><li>Email:' + buyer.email + '</li><li>Delivery address:' + order.location + '</li></ul>' + salutation
                      };
                      
                      transporter.sendMail(mailOptions, function(err, response){
                        if(err){
                          console.log("There was an " + err);
                          res.end("Failure");
                        }else{
                          console.log("******Message sent to buyer and seller******* " );
                          res.end("Success");
                        }
                      });
                      res.json("Success"); 
                    })
                  })
                });
              });
            });
          }
      });
  }
};
 