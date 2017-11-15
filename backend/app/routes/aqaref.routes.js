module.exports = function (app) {
    var controller = require('../controllers/aqaref.controller')
    app.get(['/', '/list'], controller.list)
}