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

    res.render('stock.jade');
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

      res.render('stock.jade', {quotesList: quotes});
    });
  });*/

  router.post('/stocks', function(req, res, next) { 
    
    var sess = req.session;
    var userId = sess.userId;
    var newStock = req.body.stock;

    var s = {symbol: newStock, amount: 0};

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
