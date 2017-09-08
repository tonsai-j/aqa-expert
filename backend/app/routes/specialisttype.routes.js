module.exports = function (app) {
    var specialisttype = require('../controllers/specialisttype.controller');
    app.get('/', specialisttype.list)
}