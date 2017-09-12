module.exports = function (app) {
    var controller = require('../controllers/religion.controller')
    app.get(['/', '/list'], controller.list)
}