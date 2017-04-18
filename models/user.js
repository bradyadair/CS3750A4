var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  username: String,
  email:  String,
  first_name: String,
  last_name: String,
  password: String,
<<<<<<< HEAD
  messages:  [{ 
    content: { type: String },
    date: { type: Date, default: Date.now }
  }],
  stockPercentages: [{
      name: {type:String},
      y: {type:Number}
=======
  stockPercentages: [{
    name: {type:String},
    y: {type:Number}
>>>>>>> refs/remotes/origin/master
  }]
}));