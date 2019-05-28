var mongoose = require('mongoose');

var state = {
    client: null
};

exports.connect = function (url, done) {
    if (state.db) return done();
    mongoose.connect(url, {useNewUrlParser: true});
    var db = mongoose.connection;
    if(db == null) return done('conn error');
    state.client = db;
    return done();
};

exports.get = function () {
    return state.client;
};

exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.client = null;
            done(err);
        });
    }
};