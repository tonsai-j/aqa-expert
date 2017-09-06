module.exports = function (app) {
    var controller = require('../../controllers/type/assessor.controller')
    app.get(['/', '/list'], controller.list);
}