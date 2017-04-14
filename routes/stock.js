// This file is executed in the browser, when people visit /stock/<random id>

  var express = require('express');
  var session = require('express-session');
  var jwt     = require('jsonwebtoken');
  var User    = require('../models/user');
  var router  = express.Router();
  var Highcharts = require('Highcharts');

  
 // var Highcharts = require('highcharts');
 //require('highcharts/modules/exporting')(Highcharts);

  router.all('*', (req, res, next)=>{
      //check if token exists
      var sess = req.session;    
      //if no token redirect to login
      // TODO: check valid token before next()
      if (!sess.token) {
        res.redirect('/users/login');
      } else {
        //if yes call next      
        next();
      }    
  });

  router.get('/stock', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');
    
    res.render('stock');
  });

  router.get('/stocklist', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');
    
    res.render('stocklist');
  });

    router.get('/stockview', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');
    
    res.render('stockview');
  });

    router.get('/managemoney', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');

/*
    var dict = [{
                    name: 'Microsoft Internet Explorer',
                    y: 10
                }, {
                    name: 'Chrome',
                    y: 20,
                    //sliced: true,
                    //selected: true
                }, {
                    name: 'Firefox',
                    y: 30
                }, {
                    name: 'Safari',
                    y: 0
                }, {
                    name: 'Opera',
                    y: 0
                }, {
                    name: 'UnAllocated Stocks',
                    y: 40
                }];
         */       
             

    User.findOne({
      username: req.session['username']
    }, function(err, user) 
    {
      if (err) next(err);

      if (!user) {
      } 
      else if (user) 
      {
          dict = user.stockPercentages;

          dict.unshift({name: 'Microsoft Internet Explorer',y: 10});
          
          res.render('managemoney', {dict:dict});
      }
    });  
    
    

    //res.render('managemoney', {dict:dict});

          
    
    
  });


  router.post('/managemoney', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');

    console.log("i'm in managemoney post");
    console.log(req.body.hiddenDict);

    var dict = JSON.parse(req.body.hiddenDict);

    console.log("here's my dict after parsed: " + dict);

    User.findOne(
    {
      username: req.session['username']
    }, function(err, user) 
    {
        if (err) next(err);
        if (user) 
        {
          

          console.log("here's my dict after parsed: " + dict);

          user.stockPercentages =dict;
          

          console.log("here's my stock percentages before I save");
          console.log(user.stockPercentages);
          user.save(function(err, brady){
          if(err) return console.error(err);
          });
        } 
    });
      
    
    res.render('managemoney', {dict:dict});
  });

module.exports = router;
