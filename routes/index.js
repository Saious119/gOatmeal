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
        title:req.body.title,
        content: req.body.content,
        author: req.body.author
    };
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

});

router.get('/delete', function(req,res,next){

});

module.exports =router;