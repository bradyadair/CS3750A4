// This file is executed in the browser, when people visit /chat/<random id>

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

  router.get('/', function(req, res, next) {

    var sess = req.session;
    var decodedToken = jwt.verify(sess.token, 'secret');

    // // find username on connection    
    // io.on('connection', function (socket) {
    //   //socket.on('send', function() {           
    //     socket.username = decodedToken.username;
    //     //console.log(socket.username);
    //   //}); 
    // });    
    
    res.render('chat',{username: decodedToken.username});
  });

module.exports = router;


/*
var express = require('express');
var session = require('express-session');
var jwt     = require('jsonwebtoken');
var router  = express.Router();
//var io      = require('../models/chat');

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

router.get('/', function(req, res, next) {

  var sess = req.session;
  var decodedToken = jwt.verify(sess.token, 'secret');

  
  //connection handler
  io.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
      io.emit('message', { username: decodedToken.username, message: data.message });
    });
  });
  

  res.render('chat');
});
*/
//module.exports = router;
//module.exports = function (io){}