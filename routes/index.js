var express = require('express');
var router = express.Router();

//home page
router.get('/api', function(req, res, next){
	res.json({message: 'welcome to our api'});

});

router.use(function(req, res, next){
	console.log('there are some process');
	next();
});


module.exports = router;
