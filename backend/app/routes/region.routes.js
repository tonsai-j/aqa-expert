module.exports = function (app) {
    var region = require('../controllers/region.controller');
    app.get('/', region.list)
}