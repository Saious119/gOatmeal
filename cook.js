var MongoClient = require('mongodb').MongoClient;

//Change url to access different database
var url = "mongodb://localhost:27017/newDB";
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("newDB");  
    
    
    //Change id number to get different recipe
    var query = { id: 1 };   
    
    dbo.collection("recipes").find(query).toArray(function(err, result) {
        //Result is a array of all returned results
        console.log(result);
        console.log("Recipe Name: ");
        console.log(result[0].recipeName);
        console.log("ID: ");
        console.log(result[0].id);
        
        var ingredients = result[0].inredients
        console.log("Ingredients: ");
        console.log(result[0].ingredients);
        
        var steps = result[0].steps 
        console.log("Steps: ");
        console.log(steps);
        
        var tags = result[0].tags
        console.log("Tags: ");
        console.log(tags)

        
        db.close();1
    }); 

});



