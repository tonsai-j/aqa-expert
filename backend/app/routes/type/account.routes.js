module.exports = function (app) {
    var controller = require('../../controllers/type/account.controller')
    app.get(['/', '/list'], controller.list);
}