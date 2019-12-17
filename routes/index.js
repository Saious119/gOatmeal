var express = require('express');
var router = express.Router();
var assert = require('assert');

var url = 'mongodb://localhost:27017';

const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const client = new MongoClient(url);
const dbName = 'newDB';

/* GET home page. */
router.get('/', function(req, res, next) {
    var recipes = [];
    MongoClient.connect(url, function(err, client){
        assert.equal(null, err);
        const db = client.db(dbName);
        var cursor = db.collection('recipes').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            recipes.push(doc);
        }, function(){
          client.close();
          res.render('index', {recipes: recipes});
        });
    });
});


router.get('/cook/:id', function(req, res, next){
    var ingredients = [];
    var steps = [];
    var picURL;
    var id = req.params.id; 
    var oID = new ObjectId(id);
    MongoClient.connect(url, function(err, client){
        assert.equal(null, err);
        const db = client.db(dbName);
        var cursor = db.collection('recipes').find({_id: oID});
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            ingredients = doc.ingredients;
            steps = doc.steps;
            picURL = doc.imgURL;
        }, function(){
          client.close();
            console.log(ingredients);
            console.log(steps);
          res.render('cook', {ing: ingredients, steps: steps, picURL: picURL});
        });
    });
});

router.get('/add', function(req, res, next){
  res.render('Add');
});

router.get('/shoppingcart', function(req, res, next){
  res.render('shopping-cart');
});

router.get('/delete/:id', function(req, res, next){
    var id = req.params.id; 
    var oID = new ObjectId(id);
    
    MongoClient.connect(url, function(err, client){
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('recipes').deleteOne({"_id": oID}, function(err, result){
        assert.equal(null, err);
        client.close();
        });
    });
    res.redirect('/');
});


router.post('/insert', function(req, res, next){
    /*
    var recievedData = {
        title: req.body.recipeName,
        ingName: req.body.ingredientName,
        servingSizes: req.body.servingSize,
        steps: req.body.step,
        times: req.body.time,
    }
    */
    
    var recievedName = req.body.recipeName
    var recievedIngredients = req.body.ingredientName
    var servingSizes = req.body.servingSize
    var steps = req.body.step
    var times = req.body.time
    var description = req.body.description
    var imgURL = req.body.picURL
    console.log(recievedIngredients);
    console.log(steps);
    var combinedIngredients = [];
    var combinedSteps = [];

    var i
    for(i = 0; i < recievedIngredients.length; i++){
        combinedIngredients.push([recievedIngredients[i],servingSizes[i]]);
    }
    for(i = 0; i < steps.length; i++){
        combinedSteps.push([steps[i],times[i]]);
    }
  
    var combinedData = {
        recipeName: recievedName,
        ingredients: combinedIngredients,
        steps: combinedSteps,
        tags: ["Yummy","Tasty"],
        description: description,
        imgURL: imgURL,
    }
    MongoClient.connect(url, function(err, client){
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('recipes').insertOne(combinedData, function(err, result){
        assert.equal(null, err);
        console.log('Item inserted');
        client.close();
        });
    });
    console.log(combinedData);
    res.redirect('/');
});



module.exports = router;

