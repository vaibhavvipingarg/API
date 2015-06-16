var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var shopSchema   = new Schema({
	name: String,
	owner_id: String
});

module.exports = mongoose.model('Shop', shopSchema);