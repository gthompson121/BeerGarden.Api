var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
var db = require('./db/db');
process.env.NODE_ENV = 'production';
const config = require('./config/config.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    if (typeof req.headers.origin !== 'undefined' && req.headers.origin)
    {
        console.log(req.headers.origin);
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    else
    {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var routes = require('./api/routes/venueRoute'); //importing route
routes(app); //register the route

db.connect(global.gConfig.database, function (err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        app.listen(global.gConfig.node_port, function () {
            console.log('Venue API server started on: ' + global.gConfig.node_port);
        });
    }
});

