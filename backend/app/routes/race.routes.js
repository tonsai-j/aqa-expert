module.exports = function (app) {
    var race = require('../controllers/race.controller');
    app.get('/', race.list)
}