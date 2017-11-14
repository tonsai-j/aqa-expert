module.exports = function (app) {
    var controller = require('../controllers/academy.controller')
    app.get(['/', '/list'], controller.list)
    app.get('/filter', controller.filter)
}