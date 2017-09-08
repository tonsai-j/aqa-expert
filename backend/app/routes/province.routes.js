module.exports = function (app) {
    var province = require('../controllers/province.controller');
    app.get('/', province.list)
}