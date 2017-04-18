// This file is executed in the browser, when people visit /stock/<random id>

  var express = require('express');
  var session = require('express-session');
  var jwt     = require('jsonwebtoken');
  var User    = require('../models/user');
  var router  = express.Router();
  var User = require('../models/user.js');

  
  var Highcharts = require('highcharts'); // Since 4.2.0

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

  router.get('/addStock', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');

    res.render('stock');
  });
    /*var yahooFinance = require('yahoo-finance');

    yahooFinance.historical({
      symbol: 'AAPL',
      from: '2012-01-01',
      to: '2012-01-05',
      // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    }, function (err, quotes) {
      //...
      console.log(quotes);
      var fs = require('fs');
      var readline = require('readline');

      res.render('stock', {quotesList: quotes});
    });
  });*/

  router.post('/stocks', function(req, res, next) { 
    
    var sess = req.session;
    var userId = sess.userId;
    var newStock = req.body.stock;

    var s = {name: newStock, y: 0};

    User.findOneAndUpdate({_id: userId },{$push: { stocks : s }},{upsert:true, safe:true})
        .then(function(stock) { 
            res.status(200).json(stock);
        })
        .catch(function(err){
            console.log(err);
            return res.status(500).json(err);
        })
    });

    /*User.update({_id: userId },
            {$push: { stocks : s }}, function(err, stock) {
              if (err) {
                  return res.status(500).json(err);
              } else {
                  res.status(200).json(stock);
              }
    }); */

  //});   
    
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

/*
          //used for deleting a specific item from the array
          for (var i = 0; i<dict.length; i++)
          {
            if (dict[i]['name'] == 'Microsoft Internet Explorer')
            {
              dict.splice(i, 1);
            }
          }
          */

          //used for adding an item to the beginning of the array
          //dict.unshift({name: 'Microsoft Internet Explorer',y: 10});
          //dict.unshift({name: 'Walmart',y: 10});
          
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
      
    res.render('managemoney', {Highcharts: Highcharts});
  });

module.exports = router;
