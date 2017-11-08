module.exports = function (app) {
    var district = require('../controllers/district.controller');
    app.get('/', district.list)
    app.get('/sub', district.sub)
}