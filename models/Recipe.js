const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const recipeSchema = new Schema({
  name: {
    type: String,
  },
  ingredients: {
    type: Array
  },      
  cookingsteps: {
    type: Array
  },
  tags: {
    type: Array
  },
  description: {
    type: String
  }
});
const Recipe = mongoose.mode('Recipe', recipeSchema);

module.exports = Recipe;

