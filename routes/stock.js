// This file is executed in the browser, when people visit /stock/<random id>

  var express = require('express');
  var session = require('express-session');
  var jwt     = require('jsonwebtoken');
  var router  = express.Router();
  var User = require('../models/user.js');

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
/*
  router.get('/', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');
    
    res.render('stock');
  });
  */

  router.get('/addStock', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');
    
    var yahooFinance = require('yahoo-finance');

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

      res.render('stock.jade', {quotesList: quotes});
    });
  });

  /*function doesStockExist(stock, fn) {
      User.findOne({
              stock: stock.toLowerCase()
          },
          function(err, q) {
              if (q) {
                  return fn(null, q)
              } else {

                  return fn(new Error('gtg'));
              }
          });
  }*/

 // POST OR PATCH ??? WORKING ON IT

  /*router.post('/addStock', function(req, res, next) { 
    
    var stock = req.body.stock;
    var id = req.params.id;
    var query = { _id: id };
    var newStock = req.body.stock;

    User.findOneAndUpdate(query, {$set:{stocks: {symbol: newStock, amount: 0}}})
        .then(function(stock){
            res.status(200).json(stock);
        })
        .catch(function(err){
            return res.status(500).json(err);
        })
    });
  */
  
  router.get('/stocklist', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');
    
    res.render('stocklist.jade');
  });

    router.get('/stockview', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');
    
    res.render('stockview.jade');
  });

    router.get('/managemoney', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');
    
    res.render('managemoney.jade');
  });

module.exports = router;
