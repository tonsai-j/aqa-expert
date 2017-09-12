module.exports = function (app) {
    var controller = require('../controllers/workStatus.controller')
    app.get(['/', '/list'], controller.list)
}