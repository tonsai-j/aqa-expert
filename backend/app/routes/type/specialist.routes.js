module.exports = function (app) {
    var specialist = require('../../controllers/type/specialist.controller');
    app.get('/', specialist.list)
}