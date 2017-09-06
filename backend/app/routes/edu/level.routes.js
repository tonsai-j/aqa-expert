module.exports = function (app) {
    var controller = require('../../controllers/edu/level.controller')
    app.get(['/', '/list'], controller.list)
}