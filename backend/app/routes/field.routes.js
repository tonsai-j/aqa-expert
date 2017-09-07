module.exports = function (app) {
    var fieldStudy = require('../controllers/fieldStudy.controller');
    app.get('/study', fieldStudy.list)
}