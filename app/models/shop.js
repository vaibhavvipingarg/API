var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var shopSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Shop', shopSchema);