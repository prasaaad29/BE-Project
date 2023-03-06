# BE-Project

## Steps to setup the project

### 1.Installations

1. NodeJS 
2. Neo4j server 
3. VScode

### 2.Clone the repository
+ using git clone
+ or
+ download the zip

### 3.Open the project in VScode (you will see 2 folders client and server)
1. right click on client folder and select "Open in integrated terminal"
2. (MUST) In the integrated terminal of client run "npm install" 
3. right click on server folder and select "Open in integrated terminal"
4. (MUST) In the integrated terminal of server run "npm install" 

### 4. Go to the folder where neo4j is installed
 1. Open command prompt there
 2. run "bin\neo4j console" in the terminal
 3. once the server is started go to the web browser search for http://localhost:7474/
 4. Connect to the database with user=neo4j and password=prasadgosavi
 5. Once the connect is established run "match (n) return n" there , to see the visual representation of graph 
 
 ### 5. Go to the VScode 
 1. run "nodemon app.js" in server integrated terminal
 + If you get nodemon not found error try installing with "npm i nodemon --save"
 + Still if nodemon does not work then run "node app.js"
 2. run "npm start" in client integrated terminal
