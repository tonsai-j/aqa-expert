module.exports = function (app) {
    var controller = require('../controllers/level.controller')
    app.get('/', controller.get);
}