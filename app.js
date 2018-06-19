var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Vehicle = require('./public/DB/vehicle');
var router = express.Router();
var index = require('./routes/index');

//To grab data from body of post so configure app for bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



//api routes
app.use('/', index);
app.use('/api', router);



router.route('/vehicles')
  .post(function(req, res) {
    var vehicle = new Vehicle(); // new instance of a vehicle
    vehicle.make = req.body.make;
    vehicle.model = req.body.model;
    vehicle.color = req.body.color;

    vehicle.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Vehicle was successfully manufactured'});
    });
  })

  .get(function(req, res) {
    Vehicle.find(function(err, vehicles) {
      if (err) {
        res.send(err);
      }
      res.json(vehicles);
    });
  });



/*

router.route('/vehicle/:vehicle_id')
  .get(function(req, res) {
    Vehicle.findById(req.params.vehicle_id, function(err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

router.route('/vehicle/make/:make')
  .get(function(req, res) {
    Vehicle.find({make:req.params.make}, function(err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

router.route('/vehicle/color/:color')
  .get(function(req, res) {
    Vehicle.find({color:req.params.color}, function(err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

  

*/



//set port on server
app.set('port', 3000);

//connect to DB
mongoose.connect('mongodb://localhost:27017/helloapi');

//start the server
app.listen(app.get('port'));
console.log('server start on ' + app.get('port'));






