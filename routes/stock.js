// This file is executed in the browser, when people visit /stock/<random id>

  var express = require('express');
  var session = require('express-session');
  var jwt     = require('jsonwebtoken');
  var router  = express.Router();
  var Highcharts = require('Highcharts');
  
  var User          = require('../models/user');
  var yahooFinance = require('yahoo-finance');

  
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
    var fromDate = '2017-04-04';
    var toDate = '2017-04-11';

    //console.log(decodedToken);
    //console.log(decodedToken.stocks[1].symbol);

    yahooFinance.historical({
      symbol: decodedToken.stocks[1].symbol,
      from: fromDate,
      to: toDate,
      period: 'd'  
    }, function (err, quotes) {
      if (err) { throw err; }
      if (quotes[0]) {
        //console.log(
        //   '%s\n...\n%s',
        //   JSON.stringify(quotes[0], null, 2),
        //   JSON.stringify(quotes[quotes.length - 1], null, 2)
        // );
        // render with default values
        
        var dataArray = {
					name1: 'Installation',
					data1: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
				};

        res.render('stockview', dataArray);
        //console.log(quotes);
      } else {
        console.log('Symbol not Found');        
        res.render('stockview');
      }
    });    
    
  });

    router.get('/managemoney', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');
    
    res.render('managemoney');
  });

module.exports = router;
