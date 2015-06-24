var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var shopSchema   = new Schema({
	name: String,
	owner_id: String,
	reviews: [Schema.Types.Mixed],
	products: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Shop', shopSchema);