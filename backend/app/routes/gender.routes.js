module.exports = function (app) {
    var controller = require('../controllers/gender.controller')
    app.get(['/', '/list'], controller.list)
}