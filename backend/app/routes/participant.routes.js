module.exports = function (app) {
    var controller = require('../controllers/participant.controller');
    app.get('/year', controller.year);
}