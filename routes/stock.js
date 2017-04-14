// This file is executed in the browser, when people visit /stock/<random id>

  var express = require('express');
  var session = require('express-session');
  var jwt     = require('jsonwebtoken');
  var router  = express.Router();

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

    /*var fs = require('fs');
    var array = fs.readFileSync('files/NASDAQ.txt').toString().split("\n");
    for(i in array) {
        console.log(array[i]);
    }*/

    /*var fs = require('fs');
    var readline = require('readline');

    var filename = 'public/files/NASDAQ.txt';
    readline.createInterface({
        input: fs.createReadStream(filename),
        terminal: false
    }).on('line', function(line) {

      console.log('Line: ' + line);
*/
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
      

      //console.log(symbols["IBM"].name);
      /*var filename = 'public/files/NASDAQ.txt';
      readline.createInterface({
          input: fs.createReadStream(filename),
          terminal: false
      }).on('line', function(line) {

          console.log('Line: ' + line);
          res.render('stock.jade', {quotesList: quotes});
      });*/
      res.render('stock.jade', {quotesList: quotes});
    });
  });

  router.patch('/addStock', function(req, res, next) { 
    var id = req.params.id;
    var query = { _id: id };
    var newStock = req.body.stock;

    Question.findOneAndUpdate(query, {$set:{answer: newAnswer}})
        .then(function(question){
            res.status(200).json(question);
        })
        .catch(function(err){
            return res.status(500).json(err);
        })
    
  });

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
