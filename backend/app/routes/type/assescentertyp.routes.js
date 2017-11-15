module.exports = function (app) {
    var controller = require('../../controllers/type/assescentertyp.controller')
    app.get(['/', '/list'], controller.list)
}