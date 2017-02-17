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
3. To access the website: http://localhost:9020/project/client/#/item
4. To check the database structure: open git and navigate to the mongod application
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
