module.exports = function (app) {
    var specialist = require('../../controllers/group/specialist.controller');
    app.get('/', specialist.list)
}