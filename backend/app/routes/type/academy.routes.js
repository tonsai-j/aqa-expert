module.exports = function (app) {
    var controller = require('../../controllers/type/academy.controller')
    app.get(['/', '/list'], controller.list);
}