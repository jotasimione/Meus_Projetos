const express = require('express');
const expressValidator = require('express-validator');
const consign = require('consign'); 
const bodyParser = require('body-parser');
const app =  express();

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

consign()
    .include('controllers')
    .into(app);

module.exports = app;