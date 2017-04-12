// This file is executed in the browser, when people visit /stock/<random id>

  var express = require('express');
  var session = require('express-session');
  var jwt     = require('jsonwebtoken');
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

    var dict = [{
                    name: 'Microsoft Internet Explorer',
                    y: 33.1
                }, {
                    name: 'Chrome',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Firefox',
                    y: 10.38
                }, {
                    name: 'Safari',
                    y: 4.77
                }, {
                    name: 'Opera',
                    y: 0.91
                }, {
                    name: 'Proprietary or Undetectable',
                    y: 0.2
                }];
    
    res.render('managemoney', {dict:dict});
  });

module.exports = router;
