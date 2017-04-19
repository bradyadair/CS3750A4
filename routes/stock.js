// This file is executed in the browser, when people visit /stock/<random id>

  var express = require('express');
  var session = require('express-session');
  var jwt     = require('jsonwebtoken');
  var User    = require('../models/user');
  var router  = express.Router();
  var User = require('../models/user.js');
  var yahooFinance = require('yahoo-finance');

  
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


/****************** ADD STOCK ROUTER/CONTROLLER ***********************/


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


  /****************** STOCKS ROUTER/CONTROLLER ***********************/

  router.post('/stocks', function(req, res, next) { 
    
    var sess = req.session;
    var userId = sess.userId;
    var newStock = req.body.name;

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');
    var myUser = decodedToken.username.replace(" ", "");

    var s = {name: newStock, y: 0};
    User.findOne({
      username: myUser,
      stockPercentages : {$elemMatch: {name: newStock}}
    }).then(function(stock, err) { 
            console.log(stock);
            if (stock === null) {
                console.log("Stock does not exist.  We can add stock now.")
                User.findOne({
                  username: myUser,
                }, function(err, user) 
                {
                  if (err) next(err);//return res.status(500).json(err);//
                  

                  if (!user) {
                  } 
                  else if (user) 
                  {
                      var dict = user.stockPercentages;

                      //used for adding an item to the beginning of the array
                      user.stockPercentages.unshift({name: newStock,y: 0});// = dict.unshift({name: 'Microsoft Internet Explorer',y: 10});

                      user.save(function(err, brady){
                      if(err) return console.error(err);
                    });
                    
                      
                  }
                }).then(function(stock) { 
                    console.log(stock);
                    res.status(200).json(stock);
                  })
                  .catch(function(err){
                      console.log(err);
                      return res.status(500).json(err);
                  });
            }
            else {
              console.log("Stock already exists.")
              console.log(err);
              res.status(405).json(err);
            }
        })
        .catch(function(err){ 
              console.log(err);
              return res.status(405).json(err);
        })
    

/*
    User.findOneAndUpdate({_id: userId },{$push: { stockPercentages : s }},{upsert:true, safe:true})
        .then(function(stock) { 
            res.status(200).json(stock);
        })
        .catch(function(err){
            console.log(err);
            return res.status(500).json(err);
        })
        */
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
    

/****************************    STOCK LIST ROUTER / CONTROLLER ********************8****/

router.get('/stocklist', function (req, res, next) {
  var sess = req.session;
  var decodedToken = jwt.verify(sess.token, 'secret');
  var name = decodedToken.username.replace(" ", "");      // THIS IS HOW WE HAVE TO GET THE USERNAME, NOTE: MUST USE THE REPLACE CASUE WHITESPACE
  User.findOne({
    username: name
  }, function (err, user) {
    if (err) next(err);

    if (!user) {
      res.render('error.jade', { error: "Didnt find the user" });
    } else {
      // start of html string to concatonate and pass as final html string
      var finalHtml = "<Table class='stocktable'><tr><th class='stockLabel'>Stock Name</th><th class='stockLabel'>Ticker</th><th class='stockLabel'>Open Price</th><th class='stockLabel'>Current Price</th><th class='stockLabel'>Status</th><th class='stockLabel'></th></tr>"
      var tempHtml = "";
      var status = "";
      var math = 0;
      count = 0;
      var tick = "";
      // gets the users tickers and puts them in an array or if empty renders page
      var n = user.stockPercentages.length;
      var tickers = [];
      console.log("\nSize of sockPercentages: " + n);
      if (n < 2) {
        console.log("Rendering empty page\n");
        res.render('stocklist', { stockHtml: finalHtml, tick: tick });
      }
      else{
        user.stockPercentages.forEach(function (ticker) {
          if (ticker.name != 'UnAllocated Stocks') {
            tickers.push(ticker.name);
          }
        });
        console.log("\nFound tickers: " + tickers + "\n");
        // this is where the functions above actually start getting called, did it last so their vars are declared and instantiated
        yahooFunct(finalHtml, tempHtml, tickers, status, tick, math, count, n, res);
      }
      // function queries yahoo for financial data and appends to html variables to pass through the render and use on users page
      function yahooFunct(finalHtml, tempHtml, tickers, status, tick, math, count, n, res) {
        console.log("Tickers:" +tickers);
        console.log("Length Tickers: " + tickers.length);
        for (var i = 0; i < tickers.length; i++) {
          console.log("Current Ticker:" +tickers[i]);
          yahooFinance.snapshot({
            symbol: tickers[i],
            fields: ['s', 'n', 'o', 'l1']
          }, function (err, snapshot) {
            if (err) {
              console.log(err);
              next(err);
            }
            if (!snapshot) {
              // change it so renders error on page
              res.render('stocklist', { error: "Didnt find the users stock: " + ticker[i], stockHtml: finalHtml, tick: tick });
            }
            else {
              math = Number(snapshot.open) - Number(snapshot.lastTradePriceOnly);
              if (math > 0) {
                status = "DOWN";
              }
              else if (math == 0) {
                status = "NO CHANGE";
              }
              else {
                status = "UP";
              }

              tempHtml += "<tr class='stockListRow'>";
              tempHtml += "<td class='stockColumn'>" + snapshot.name + "</td><td class='stockColumn'>" + snapshot.symbol + "</td><td class='stockColumn'>$" + snapshot.open + "</td><td class='stockColumn'>$"
                + snapshot.lastTradePriceOnly + "</td><td class='stockColumn'>" + status + "</td><td class='stockColumn'><a href='#' id='removebtn' data-id='" + snapshot.symbol + "' name='removebtn' class='btn btn-red'>Remove</a></td>";
              tempHtml += "</tr>";
              console.log("\n"+tempHtml);
              count += 1;
              console.log("\nCount : " + count);
              // The query isnt syncing well so this is sort of a work around to wait to render the page
              // We may want a better solution
              if (count == tickers.length) {
                finishHtml(count, tempHtml, finalHtml, tick, res);
              }
            }
          });
        }
      }
      // made this function to delay rendering page because the query for financial data needs a promise, crude workaround
      function finishHtml(count, tempHtml, finalHtml, tick, res) {
        console.log("-- In finishHtml");
        console.log("Final Count : " + count + "\n");
        finalHtml += tempHtml;
        finalHtml += "</table>";

        res.render('stocklist', { stockHtml: finalHtml, tick: tick });
      }
    }
  });
});



router.post('/stocklist', function (req, res, next) {
  // Delete the selected ticker from watchlist in user
  // redirect to /stock/stocklist
  var sess = req.session;
  var decodedToken = jwt.verify(sess.token, 'secret');
  var name = decodedToken.username.replace(" ", "");      // THIS IS HOW WE HAVE TO GET THE USERNAME, NOTE: MUST USE THE REPLACE CASUE WHITESPACE
  console.log("\nI'm in stockview post");
  var ticker = "";
  ticker = JSON.parse(req.body.hiddenTicker).replace(" ", "").toUpperCase();
  User.findOne({
    username: name
  }, function (err, user) {
    if (err) next(err);
    if (!user) {
      res.render('error.jade', { error: "Didnt find the user" });
    } else {
      console.log("Ticker: " + ticker);
      console.log("\nIn stocklist post status = remove\n");
        User.findOneAndUpdate({ username: name }, { $pull: { stockPercentages: {name: ticker} } }, { upsert: true, safe: true })
          .then(function (stock) {
            res.redirect('stocklist');
            //res.status(200).json(stock);
          })
          .catch(function (err) {
            console.log(err);
            if (err) next(err);
            //return res.status(500).json(err);
          })
    }
    
  });
});


/****************** STOCK VIEW ROUTER/CONTROLLER ***********************/

    router.get('/stockview', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');
    
    res.render('stockview');
  });



/****************** MANAGE MONEY ROUTER/CONTROLLER ***********************/

    router.get('/managemoney', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');
    var myUser = decodedToken.username.replace(" ", "");

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
      username: myUser
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
    var myUser = decodedToken.username.replace(" ", "");

    console.log("i'm in managemoney post");
    console.log(req.body.hiddenDict);

    var dict = JSON.parse(req.body.hiddenDict);

    console.log("here's my dict after parsed: " + dict);

    User.findOne(
    {
      username: myUser
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
