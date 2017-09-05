module.exports = function (app) {
    var controller = require('../controllers/register.controller')
    app.route('/')
        .post(controller.post);
}