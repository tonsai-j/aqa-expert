module.exports = function (app) {
    var controller = require('../../controllers/profile/info.controller')
    app.route('/')
        .get(controller.get);
}