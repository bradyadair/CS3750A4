var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  username: String,
  email:  String,
  first_name: String,
  last_name: String,
  password: String,
  stocks: [{
    ticker: {type: String},
    percentage: {type: Number},
    purchase_price: {type: Number}
  }],
  watchlist: [{tpye: String, default: ""}],
  messages:  [{ 
    content: { type: String },
    date: { type: Date, default: Date.now }
  }]
}));