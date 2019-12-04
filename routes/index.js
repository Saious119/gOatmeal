var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url ='mongodb://localhost:27017'

/*Get home page.*/
router.get('/',function(req,res,next){
    res.render('index');
});

router.get('/get-data', function(req,res,next){
    var resultArray =[];
    mongo.connect(url, function(err, db){
        assert.equal(null,err);
        var cursor = db.collection('user-data').find();
        cursor.forEach(function(doc,err){
            assert.equal(null,err);
            resultArray.push(doc);
        }, function(){
            db.close();
            res.render('index',{items: resultArray});
        });
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
    };
    var id = req.body.id;
    mongo.connect(url, function(err, db){
        assert.equal(null,err);
        db.collection('user-data').insertOne(item,function(err, result){
            assert.equal(null,err);
            console.log('Item inserted');
            db.close();
        });
    });
});

router.post('/update', function(req,res,next){
    var item ={
        name:req.body.name,
        id: req.body.id,
        ingedients: req.body.ingedients,
        cookingSteps: req.body.cookingSteps,
        tags: req.body.tags,
        description: req.body.description,
    };
    var id = req.body.id;
    mongo.connect(url,function(err,db){
        assert.equal(err,null);
        db.collection('user-data').updateOne({"_id": objectId(id)},{$set: item}, function(err, result){
            assert.equal(null, err);
            console.log('Reciepe Updated');
            db.close();
        });
    });
});

router.get('/delete', function(req,res,next){
    var id = req.body.id;

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
            assert.equal(null, err);
            console.log('Item deleted');
        db.close();
    });
  });
});

module.exports =router;