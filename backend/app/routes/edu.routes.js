module.exports = function (app) {
    var eduLevel = require('../controllers/eduLevel.controller')
    app.get('/level', eduLevel.list)
}