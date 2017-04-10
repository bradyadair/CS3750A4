var express = require('express');
var router = express.Router();

/* create page that redirects to /chat/id */
router.get('/', function(req,res){

		// Generate unique id for the room
		var id = Math.round((Math.random() * 1000000));

		// Redirect to the random room
		res.redirect('/chat/' + id);
	});

module.exports = router;