const Recipe = require('../models/gOatmeal.model');
exports.recipe_create = function (req, res) {
    let recipe = new Recipe(
        {
            name:req.body.name,
            id: req.body.index,
            ingredients: req.body.ingredients,
            cookingSteps: req.body.cookingSteps,
            tags: req.body.tags,
            description: req.body.description,
            time:req.body.time,
            calories:req.body.calories,
            amount:req.body.amount,
            img_url:req.body.img_url
        }
    );

    recipe.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Recipe Created successfully')
    })
};

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller! haha');
};

exports.gOatmeal_details = function (req, res) {
    console.log(req.params.id);
    //console.log("LOOOK HERE DUMBASS");
    Recipe.findById(req.params.id, function (err, recipe) {
        if (err) return next(err);
        res.send(recipe);
    })
};

exports.gOatmeal_update = function (req, res) {
    Recipe.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, recipe) {
        if (err) return next(err);
        res.send('Recipe udpated.');
    });
};

exports.gOatmeal_delete = function (req, res) {
    Recipe.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};