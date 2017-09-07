module.exports = function (app) {
    var controller = require('../../controllers/type/research.controller')
    app.get(['/', '/list'], controller.list);
}