module.exports = function (app) {
    var controller = require('../../controllers/type/doc.controller')
    app.get(['/', '/list'], controller.list);
}