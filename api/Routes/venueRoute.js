'use strict';
module.exports = function (app) {
    var venueList = require('../controllers/venueController');
    
    app.route('/test')
        .get(venueList.test);

    // venue Routes
    app.route('/venues')
        .get(venueList.list_all_venues)
        .post(venueList.create_a_venue);

    app.route('/venues/:venueId')
        .get(venueList.get_venue)
        .put(venueList.update_a_venue)
        .delete(venueList.delete_a_venue);

    app.route('/venues/geo').post(venueList.get_venues_geo);
};