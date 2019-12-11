
//var $ = require('jquery');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var express = require('express');
var fs = require('fs');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;


var htmlFile

fs.readFile('./cook.hbs', function(err, data){
  if (!err) {
    // make the buffer into a string
    var source = data.toString();
    // call the render function
    htmlFile = renderToString(source, {name: "Recipe"});
  } else {
        console.log("Error");
  }
});

// this will be called after the file is read
function renderToString(source, data) {
  var template = hbs.compile(source);
  var outputString = template(data);
    console.log(outputString);
    return outputString;
}




exports.html = htmlFile;

// Retrieve the template data from the HTML (jQuery is used here).
//var template = $('#handlebars-demo').html();

// Compile the template data into a function
//var templateScript = hbs.compile(template,{name: "Recipe"});

var context = { "name" : "Ritesh Kumar", "occupation" : "developer" };

// html = 'My name is Ritesh Kumar. I am a developer.'
//var html = templateScript(context);

// Insert the HTML code into the page
//$(document.body).append(html);




/*
var MongoClient = require('mongodb').MongoClient;

//Change url to access different database
var url = "mongodb+srv://tyler:typassword@goatmeal-kl33q.mongodb.net/test";
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Recipe");  
    
    
    //Change id number to get different recipe
    var query = { id: 0 };   
    
    dbo.collection("Recipe").find(query).toArray(function(err, result) {
        //Result is a array of all returned results
        console.log(result);
        console.log("Recipe Name: ");
        console.log(result[0].name);
        console.log("ID: ");
        console.log(result[0].id);
        var ingredients = result[0].IngredientName
        var firstIngredient = ingredients[0];
        console.log("Ingredients: ");
        console.log(result[0].IngredientName);
        
        function sendRecipe(id){
            alert('Test');
            return ingredients[0];
        };
        
        var steps = result[0].CookingStep
        console.log("Steps: ");
        console.log(steps);
        
        var tags = result[0].tags
        console.log("Tags: ");
        console.log(tags)

        
        db.close();
    }); 

});

*/
