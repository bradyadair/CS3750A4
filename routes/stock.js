// This file is executed in the browser, when people visit /stock/<random id>

var express = require('express');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var yahooFinance = require('yahoo-finance');
const Promise = require('bluebird');
var router = express.Router();

router.all('*', (req, res, next) => {
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

router.get('/stock', function (req, res, next) {

  var sess = req.session;
  var decodedToken = jwt.verify(sess.token, 'secret');

  res.render('stock');
});

router.get('/stocklist', function (req, res, next) {

  var sess = req.session;
  var decodedToken = jwt.verify(sess.token, 'secret');
  var name = decodedToken.username.replace(" ", "");

  User.findOne({
    username: name
  }, function (err, user) {
    if (err) next(err);

    if (!user) {
      res.render('stock/stockview', { Error: "Didnt find the user" });
    } else {
      var tickers = [];

      for (var i = 0; i < user.stocks.length; i++) {
        tickers.push(user.watchlist[i].ticker);
      }
      console.log("\nFound tickers: " + tickers + "\n");

      var n = tickers.length;
      var finalHtml = "<Table class='stocktable'><tr><th class='stockLabel'>Stock Name</th><th class='stockLabel'>Ticker</th><th class='stockLabel'>Open Price</th><th class='stockLabel'>Current Price</th><th class='stockLabel'>Status</th><th class='stockLabel'></th></tr>"
      var tempHtml = "";
      var status = "";
      var math = 0;
      count = 0;

      function yahooFunct(finalHtml, tempHtml, status, math, count, n, res) {
        for (var i = 0; i < n; i++) {

          yahooFinance.snapshot({
            symbol: tickers[i],
            fields: ['s', 'n', 'o', 'l1']
          }, function (err, snapshot) {
            /*
            {
              symbol: 'AAPL',
              name: 'Apple Inc.',t
              open: '250.12',
              lastTradePriceOnly: '524.88'
            }
            */
            if (err) next(err);
            if (!snapshot) {
              res.render('error.jade', { Error: "Didnt find the user" });
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
              tempHtml += "<td class='stockColumn'>" + snapshot.name + "</td><td class='stockColumn'>" + snapshot.symbol + "</td><td class='stockColumn'>$" + snapshot.open + "</td><td class='stockColumn'>$" + snapshot.lastTradePriceOnly + "</td><td class='stockColumn'>" + status + "</td><td class='stockColumn'><button type='button' name='remove' id='removebtn'>remove</button></td>";
              tempHtml += "</tr>";
              console.log(tempHtml);
              count += 1;
              console.log("Count : " + count);
              if(count == n)
              {
                console.log("WE ARE EXITING BEFORE QUERY IS DONE");
                console.log("External Count : " + count);
                finishHtml(count, tempHtml, finalHtml, res);
              }
            }

          });
        }
      }

      function finishHtml(count, tempHtml, finalHtml, res) {
        console.log("WE ARE DOING IT");
        console.log("Count : " + count);
        finalHtml += tempHtml;
        finalHtml += "</table>";

        res.render('stocklist', { stockHtml: finalHtml });
      }
      
      yahooFunct(finalHtml, tempHtml, status, math, count, n, res);
    }
  });
});

router.get('/stockview', function (req, res, next) {

  var sess = req.session;
  var decodedToken = jwt.verify(sess.token, 'secret');
  var sess = req.session;
  var name = decodedToken.username.replace(" ", "");

  User.findOne({
    username: name
  }, function (err, user) {
    if (err) next(err);

    if (!user) {
      res.render('stock/stockview', { Error: "Didnt find the user" });
    } else {
      res.render('stockview', { username: user.username, stocksList: user.stocks });
    }
  });
});

router.get('/managemoney', function (req, res, next) {

  var sess = req.session;
  var decodedToken = jwt.verify(sess.token, 'secret');

  res.render('managemoney');
});

module.exports = router;
