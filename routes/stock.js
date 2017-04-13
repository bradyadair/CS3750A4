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
    
    var request = require("request");

    var stock_url = "http://finance.yahoo.com/webservice/v1/symbols/FB/quote?format=json&view=%E2%80%8C%E2%80%8Bdetail";

    request(stock_url, function (error, response, body) { 
        if (!error && response.statusCode == 200) {  
            var stock_data = body;
            console.log("Yahoo Finance API: ", stock_data)
            var stock_price = stock_data.list.resources[0].resource.fields.price;
            console.log("stock_price: ", stock_price);       
        };
    });
    res.render('stock.jade');
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
