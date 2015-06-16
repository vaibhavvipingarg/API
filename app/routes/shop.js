var Shop     = require('../../app/models/shop');

module.exports = function(router, user) {
	// on routes that end in /bears
// ----------------------------------------------------
// create a bear (accessed at POST http://localhost:8080/bears)
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

// get all the bears (accessed at GET http://localhost:8080/api/bears)
router.get('/shops', function(req, res) {	
		Shop.find(function(err, shops) {
			if (err)
				res.send(err);

			res.json(shops);
		});
	});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------

	// get the SHOPS for this USER
	router.get('/shops/user/:user_id', function(req, res) {	
		console.log("found the route");
	Shop.find({ 'owner_id' :  req.params.user_id }, function(err, shops) {
		console.log("found a shop");
			if (err)
				res.send(err);
			console.log(shops);
			res.json(shops);
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

};