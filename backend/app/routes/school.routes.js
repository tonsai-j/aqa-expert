module.exports = function (app) {
    var controller = require('../controllers/school.controller')
    app.get(['/', '/list'], controller.list)
}