 
var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
const app = require('express') ()
const path = require('path')
var mongoose = require('mongoose');

var url ='mongodb+srv://andy:boneking@goatmeal-kl33q.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url);
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    id: Number,
    name:String,
    IngredientName:[String],
    Amount:[Number],
    Calories:[Number],
    cookingSteps:[String],
    time:[Number],
    image_url:String,
    tags:[String],
    description:String
}, {collection: 'recipe'});

var UserData = mongoose.model('UserData', userDataSchema);
var ingedientsList = mongoose.model('ingrediantsList', ingrediantsListSchema);

/*Get home page.*/
router.get('/',function(req,res,next){
    res.render('index');
});

router.get('/get-data', function(req, res, next) {
    UserData.find()
        .then(function(doc) {
        res.render('index', {items: doc});
    });
});

router.get('/insert', function(req,res,next){
    var item ={
        name:req.body.name,
        id: req.body.id,
        ingedients: req.body.ingedients,
        cookingSteps: req.body.cookingSteps,
        tags: req.body.tags,
        description: req.body.description,
        time:req.body.time,
        calories:req.body.Calories,
        amount:req.body.amount,
        img_url:req.body.img_url
    };
    var data = new UserData(item);
    data.save();
    res.redirect('/');

});

router.post('/update', function(req,res,next){
    var id = req.body.id;
    
    UserData.findById(id, function(err, doc){
        if(err){
            console.error('error in update');
        }
        doc.name=req.body.name;
        doc.id= req.body.id;
        doc.ingedients= req.body.ingedients;
        doc.cookingSteps= req.body.cookingSteps;
        doc.tags= req.body.tags;
        doc.description= req.body.description;
        doc.time=req.body.time;
        doc.calories=req.body.Calories;
        doc.amount=req.body.amount;
        doc.img_url=req.body.img_url;
        doc.save();
    })
    res.redirect('/');
});

router.post('/delete', function(req, res, next) {
    var id = req.body.id;
    UserData.findByIdAndRemove(id).exec();
    res.redirect('/');
});

router.get('/get-shoppingCart', function(req,res,next){
    UserData.find()
        .then(function(doc){
            res.render('/shopping-cart',{items:ingedients});
        });
});

router.get('/add-cart',function(req,res,next){
    var item = req.body.ingedients;
    var data = new ingedientsList(item);
    data.save();

    res.redirect('/shopping-cart');
})

module.exports =router;