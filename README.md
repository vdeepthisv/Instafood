Description of topic:

InstaFood will let a cook snap a picture of the meal he cooked and upload it. A hungry person can just open the app, browse through the pictures put up by various cooks, and order his home-made meal.
Website functionalities:
Every user can play either of/or both the roles:
1. Buyer ( user who wants to buy food)
2. Seller ( user who wants to sell food)

Roles for Buyer:
 Register on the website- user name, first name, last name, gender, email ID.
 Sign into the site
 Browse through various food items from multiple cuisines
 Select food item(s) and view Order summary
 Confirm payment
(On confirmation an email will be sent with details or the location and time for delivery)
 Can view order history Roles for Seller:
 Register on the website- - user name, first name, last name, gender, email ID.
 Sign into the site
 Upload a food item by mentioning the appropriate food type, cost, time for delivery
 On receiving a notification- accept the order
 Confirm delivery of the item
 Fulfil pending orders
 Can view posteditems list
 InstaFood
  Therefore we came up with the idea of creating a platform to connect foodies who are tired of
 spending on restaurants with home chefs who could gain monetarily for their efforts.
   2
     Technical Details:
We developed out website using MEAN STACK (MongoDB, express js, angular js and node js) on windows platform.
 Installations:
 Installed and used text editors – IntelliJ and sublime text
 Mongodb installation
 Git bash installation for running mongodb commands
 Nodejs installation
 Node packages installations (these can be installed through command line statements).
The main reason we chose MEAN:
 Open source and can be used in any operating system.
 Supports MVC ( model view controller architecture)
 MongoDb is a schemaless database framework which doesn’t involve any complex joins and
is just one group holding different collections.
 Each object ID created in the database is encrypted.
 Node.js platform provides a wide range of features that can be carried out (with simple
command line installations of node modules).
 Multiple-platform compatible written code
 Javascript is used everywhere, making it more convenient - client side as well as server side
and mongoDB uses JSON format Key features:
 User registration, login and logout.
 Basic implementation of StripeJS for payment transaction functionality. It sends the customer’s
payment information from the client to Stripe’s server and returns a token that Stripe associated with that payment information. Then, when the form is submitted, the token can be used on our site to process the payment. The customer’s payment information never reaches our server thereby protecting the customer's information.
 Implemented responsive web design using Bootstrap
 Using PassportJS as authentication middleware to take care of our authentication concerns as it
is easily configured into any Express based web application
 Users can edit their profile ( change password, address)
 Search for food based on food variety
 Database collections part of the code implemented in models
 Allowing seller to upload image and re-size it accordingly to 600 X 400
 Email notification to the buyer and seller once an order has been requested using nodemailer.
 Allow the seller to view the previously added postings.
 Allow the users to view the order history.

   
 Options for the users to search food.
 Dialogs for every required field (register, sign in, placing order etc.)
 Intellisense for the users while entering address using address parser.
 Option for the seller to confirm once the food is checked out.
 Handled cases such as seller ordering his own food by mistake
 Prevents seller from editing food that has already been ordered.
 Alerts through dialogs when invalid credentials are entered or incorrect password is given.
 Displays confirmation messages after successful orders/payments/uploads.
 Dialogs that prompt users for searching items/posting images/making payments.
 Immediate update of available food list by removing items that have been ordered by others.


Instructions to run the code:

To run the application on local host, you need NodeJS installed and MongoDB running:
 MongoDB :https://www.mongodb.org/downloads
 NodeJS : https://nodejs.org/en/
 (Optional) Git Bash : https://git-scm.com/downloads
After installing the above softwares:

1. Run MongoDB:
On command shell prompt, navigate to the MongoDB folder.
Give the command: mongod. You'll receive a message saying connection is open on a port number.
2. Run the Node:
Open another command shell prompt and navigate to the project folder.
To start node, type: node server.js.
(If we don’t get any errors, we are all set with the installations and ready to login to the website.)
3. To check the database structure: open git and navigate to the mongod application
    folder. Type: ./mongod
a. To see all databases : show dbs
b. To select a database : use databasename
c. To see the collections ( tables) show collections


2. Running MongoDB server:
 Next step is we need the MongoDB server running.
 When accessing the application in weblab, the mongodb server is automatically running.

3. Starting the node:
 Download and extract the project folder. Save it in the server in a particular location and start the node as:
  node server.js
