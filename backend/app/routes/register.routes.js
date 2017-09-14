module.exports = function (app) {
    var controller = require('../controllers/register.controller')
    app.post('/', controller.post);
    app.get('/check', controller.check);
}