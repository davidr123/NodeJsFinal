var express = require('express');
var router = express.Router();

var fortune = require('../lib/fortune.js');


router.get('/', function (req, res) {
    res.render('index', {title: "Index Home"});
});

//formato reducido para renderizar la vista 
router.get('/thank-you', (req, res) => res.render('thank-you') );

//usa modulos de la libreria fortune.js
router.get('/about', function(req, res){
  res.render('about', { fortune: fortune.getFortune() });
});


//++++++++++++++++++FORMS ++++++++++++++++++++

// route login form
router.get('/login', function(req, res){
  res.render('login', { csrf: 'ABCD token' });
});

// get data from form in order to save on database
router.post('/process', function(req, res){
  console.log('Form (from querystring): ' + req.query.form);
  console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('Name (from visible form field): ' + req.body.name);
  console.log('Email (from visible form field): ' + req.body.email);
  res.redirect(303, '/thank-you');
});


module.exports = router;


