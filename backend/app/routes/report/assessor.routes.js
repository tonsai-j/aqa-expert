module.exports = function (app) {
    var controller = require('../../controllers/report/assessor.controller');
    app.get('/cardId', controller.cardId)
}