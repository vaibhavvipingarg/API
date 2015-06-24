var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var productSchema   = new Schema({
	name: String,
	shops: [String],
	reviews: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Product', productSchema);