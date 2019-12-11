const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecipeSchema = new Schema({
    index: Number,
    name:String,
    IngredientName:[String],
    Amount:[Number],
    Calories:[Number],
    cookingSteps:[String],
    time:[Number],
    image_url:String,
    tags:[String],
    description:String
});

module.exports = mongoose.model('Recipe', RecipeSchema);