module.exports = function (app) {
    var controller = require('../../controllers/academic/position.controller')
    app.get(['/', '/list'], controller.list)
}