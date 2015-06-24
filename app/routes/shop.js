var Shop     = require('../../app/models/shop');
var Product     = require('../../app/models/product');

module.exports = function(router, user) {
	// on routes that end in /bears
// ----------------------------------------------------
// create a shop (accessed at POST http://localhost:8080/api/shops)
	router.post('/shops', function(req, res) {
		var shop = new Shop();		// create a new instance of the Bear model
		shop.name = req.body.name;  // set the bears name (comes from the request)
		shop.owner_id = req.body.owner_id;

		shop.save(function(err) {
			if (err)
				res.send(err);
			console.log(shop);
			res.json(shop);
		});
	});

	// get all the shops (accessed at GET http://localhost:8080/api/shops)
	router.get('/shops', function(req, res) {	
		Shop.find(function(err, shops) {
			if (err)
				res.send(err);

			res.json(shops);
		});
	});

	// Product related paths-------------------------------
	router.get('/shops/products', function(req, res) {	
		Shop.find({}, function(err, shops) {
			if (err)
				res.send(err);

			//Expensive call, try to use some filters
			//Iterate over all the shops and get all the products in that.
			res.json(createResponse(200, shops));
		});
	});

// on routes that end in /shops/user/:user_id
// ----------------------------------------------------

	// get the SHOPS for this USER
	router.get('/shops/user/:user_id', isLoggedIn, function(req, res) {	
		Shop.find({ 'owner_id' :  req.params.user_id }, function(err, shops) {
			if (err)
				res.send(err);

			res.json(createResponse(200, shops));
		});
	})

	router.get('/shops/:shop_id/products', function(req, res) {	
		Shop.findById(req.params.shop_id, function(err, shop) {
			if (err)
				res.send(err);

			res.json(shop.products);
		});
	})

	// get the bear with that id
	router.get('/shops/:shop_id', function(req, res) {	
		Shop.findById(req.params.shop_id, function(err, shop) {
			if (err)
				res.send(err);
			res.json(shop);
		});
	})

	// update the bear with this id
	router.put('/shops/:shop_id', function(req, res) {	
		Shop.findById(req.params.shop_id, function(err, shop) {

			if (err)
				res.send(err);

			shop.name = req.body.name;
			shop.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Shop updated!' });
			});

		});
	})

	// delete the bear with this id
	router.delete('/shops/:shop_id', function(req, res) {	
		Shop.remove({
			_id: req.params.shop_id
		}, function(err, shop) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

	// Product related paths-------------------------------
	router.get('/shops/:shop_id/products', function(req, res) {	
		Shop.findById(req.params.shop_id, function(err, shop) {
			if (err)
				res.send(err);

			res.json(createResponse(200, shop.products));
		});
	});

	router.post('/shops/:shop_id/products', function(req, res) {
		var prod = new Product();		// create a new instance of the Bear model
		prod.name = req.body.name;  // set the bears name (comes from the request)
		prod.shops.push(req.body.shop_id);

		prod.save(function(err) {
			if (err)
				res.send(err);

			Shop.findById(req.params.shop_id, function(err, shop) {
				if (err)
					res.send(err);

				shop.products.push(prod);
				shop.save(function(err) {
					if (err)
						res.send(err);

					res.json(createResponse(200, {}));
				});
			});
		});
	});

	// Review related paths-------------------------------
	router.post('/shops/:shop_id/review', function(req, res) {
		Shop.findById(req.params.shop_id, function(err, shop) {
			if (err)
				res.send(err);

			shop.reviews.push({'text': req.body.review, 'rating': req.body.rating});
			shop.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Shop review added!' });
			});

		});
	});
};

function createResponse(code, data) {
	var res = {};
	res.status = code;
	res.data = data;
	return res;
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	return next();
	if (req.isAuthenticated())
		return next();

	res.json(createResponse(403, {}));
}

