'use strict';

const Venue = require('../models/venueModel');

exports.test =function (req, res) {
        res.json('This is a test string');
};

exports.list_all_venues = function (req, res) {
    Venue.find().exec(function (err, venues) {
        if (err) {
            return res.send(500, err);
        }
        res.json(venues);
    });
};

exports.get_venues_geo = function (req, res) {

    var box = req.body;
    var geometry = {
        "type" : "Polygon",
        "coordinates" : [
            [
                // TL
                [
                    box.topLeft.lon,
                    box.topLeft.lat
                ],
                // TR
                [
                    box.topLeft.lon,
                    box.bottomRight.lat
                ],
                // BR
                [
                    box.bottomRight.lon,
                    box.bottomRight.lat
                ],
                // BL
                [
                    box.bottomRight.lon,
                    box.topLeft.lat
                ],
                // TL (to close loop)
                [
                    box.topLeft.lon,
                    box.topLeft.lat
                ],
            ]
        ]
    };

    Venue.find({location: {$geoWithin: {$geometry: geometry }}}).exec(function (err, venues) {
        if (err) {
            return res.send(500, err);
        }
        res.json(venues);
    });
};

exports.create_a_venue = function (req, res) {
   var new_venue = new Venue(req.body);
   new_venue.save(function (err, task) {
       if (err)
           res.send(err);
       res.json(task);
   });
};

exports.get_venue = function (req, res) {
   Venue.findById(req.params.venueId, function (err, task) {
       if (err)
           res.send(err);
       res.json(task);
   });
};

exports.update_a_venue = function (req, res) {
   Venue.findOneAndUpdate({ _id: req.params.venueId }, req.body, { new: true }, function (err, task) {
       if (err)
           res.send(err);
       res.json(task);
   });
};

exports.delete_a_venue = function (req, res) {
   Venue.deleteOne({
       _id: req.params.venueId
   }, function (err, task) {
       if (err)
           res.send(err);
       res.json({ message: 'Venue successfully deleted' });
   });
};