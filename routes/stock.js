// This file is executed in the browser, when people visit /stock/<random id>

  var express = require('express');
  var session = require('express-session');
  var jwt     = require('jsonwebtoken');
  var User    = require('../models/user');
  var router  = express.Router();
  var Highcharts = require('Highcharts');
  var request = require('request');
  var yahooFinance = require('yahoo-finance');
  var _ = require('underscore');

  
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

  // stockview ajax post
  router.post('/queryData', function(req, res) {
    request('http://localhost:3000/stock/stockview', function(error, resAjax, body) {
      console.log("queryData");
      //console.log(error);
      //console.log(resAjax.statusCode);
      if (!error && resAjax.statusCode == 200) {

        let dateFrom = req.body.dateFrom;
        let dateTo = req.body.dateTo;
        let period = req.body.period;
        // console.log(dateFrom);
        // console.log(dateTo);
        // console.log(period);

        var seriesArray = [];

        if (period == 'Weekly') {
          var SYMBOLS = ['AMZN', 'GOOGL'];
          // queryData(seriesArray, SYMBOLS, dateFrom, dateTo)
          //   .then(res.json( {seriesArray : seriesArray} ));
          yahooFinance.historical({
            symbols: SYMBOLS,
            from: dateFrom,
            to: dateTo,
            period: 'd'
          }).then(function (result) {              
              _.each(result, function (quotes, symbol) {
              // console.log(
              //   '=== %s (%d) ===',
              //   symbol,
              //   quotes.length
              // );        
              if (quotes[0]) {
                // console.log(
                //   '%s\n...\n%s',
                //   JSON.stringify(quotes[0], null, 2),
                //   JSON.stringify(quotes[quotes.length - 1], null, 2)
                // );
                // create data object to fill seriesArray
                var seriesObject = {};
                seriesObject.name = symbol;
                seriesObject.data = [];

                _.each(quotes, function (quote) {
                  //console.log(quote.close);
                  seriesObject.data.push(quote.close);
                });
              } else {
                console.log("N/A");
              }
              seriesArray.push(seriesObject);
              //console.log("_.each" + seriesArray);
            });  
          }).then(function(data) {
            res.json( {seriesArray : seriesArray} ); 
          })                     
        }
        
        //let instaData = [43934, 52503, 57177, 69658, 0, 0, 137133, 154175];
        //console.log(instaData);
        //res.json( {instaData: instaData} );
      }
    })
  }); 

  // function queryData(seriesArray, SYMBOLS, dateFrom, dateTo) {
  //   yahooFinance.historical({
  //     symbols: SYMBOLS,
  //     from: dateFrom,
  //     to: dateTo,
  //     period: 'd'
  //   }).then(function (result) {              
  //       _.each(result, function (quotes, symbol) {
  //       // console.log(
  //       //   '=== %s (%d) ===',
  //       //   symbol,
  //       //   quotes.length
  //       // );        
  //       if (quotes[0]) {
  //         // console.log(
  //         //   '%s\n...\n%s',
  //         //   JSON.stringify(quotes[0], null, 2),
  //         //   JSON.stringify(quotes[quotes.length - 1], null, 2)
  //         // );
  //         // create data object to fill seriesArray
  //         var seriesObject = {};
  //         seriesObject.name = symbol;
  //         seriesObject.data = [];

  //         _.each(quotes, function (quote) {
  //           //console.log(quote.close);
  //           seriesObject.data.push(quote.close);
  //         });
  //       } else {
  //         console.log("N/A");
  //       }
  //       seriesArray.push(seriesObject);
  //       //console.log("_.each" + seriesArray);
  //     });  
  //   });
  // }

module.exports = router;
