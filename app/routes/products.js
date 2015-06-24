var Product     = require('../../app/models/product');

module.exports = function(router, user) {
	// Product related paths-------------------------------
	router.get('/products', function(req, res) {	
		Shop.find({}, function(err, shops) {
			if (err)
				res.send(err);

			//Expensive call, try to use some filters
			//Iterate over all the shops and get all the products in that.
			res.json(createResponse(200, shops));
		});
	});

	router.get('/products/search', function(req, res) {	
		var q = req.query.q;

		var query = Product.find({});
		var exp = new RegExp(q, "i");
		query.where('name').regex(exp);
		query.limit(5);

		query.exec(function (err, products) {
  			if (err)
				res.send(err);
			//Return all the products matching this query
			res.json(createResponse(200, products));
		});
	});

	router.get('/products/:product_id', function(req, res) {	
		Product.findById(req.params.product_id, function(err, product) {
			if (err)
				res.send(err);

			res.json(createResponse(200, product));
		});
	});
};

function createResponse(code, data) {
	var res = {};
	res.status = code;
	res.data = data;
	return res;
}
