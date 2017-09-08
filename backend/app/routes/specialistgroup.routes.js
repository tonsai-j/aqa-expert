module.exports = function (app) {
    var specialistgroup = require('../controllers/specialistgroup.controller');
    var specialisttype = require('../controllers/specialisttype.controller');
    app.get('/', specialistgroup.list)
    app.get('/', specialisttype.list)
}