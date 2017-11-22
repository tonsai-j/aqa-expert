module.exports = function (app) {
    var controller = require('../../controllers/type/actother.controller')
    app.get(['/', '/list'], controller.list);
}