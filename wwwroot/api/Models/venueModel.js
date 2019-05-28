'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var venueSchema = new Schema({
    Name: {
        type: String,
        required: 'Kindly enter the Name of the venue'
    },
    Address: {
        type: String
    },
    Neighbourhood: {
        type: String
    },
    Website: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    Geo:{
        Lat:{
            type: Number,
            required: 'Kindly enter the lat of the venue'
        },
        lon:{
            type:Number,
            required: 'Kindly enter the lon of the venue'
        }
    },
    location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    ListOfOpenHours:[
    {
        Day:{
            type: Number,
            enum: [0,1,2,3,4,5,6],
            default:0
        },
        OpeningHours:{
            type:String
        },
        ClosingHours:{
            type:String
        }
    }
    ]
});

module.exports = mongoose.model('Venue', venueSchema);