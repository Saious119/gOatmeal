//app.js
const express = require('express');
const bodyParser = require('body-parser');
const gOatmeal = require('./routes/gOatmeal.route'); // Imports routes for the products
const app = express();
// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://andy:boneking@goatmeal-kl33q.mongodb.net/test';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/gOatmeal', gOatmeal);
let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});