module.exports = function (app) {
    var controller = require('../controllers/nationality.controller')
    app.get(['/', '/list'], controller.list)
}