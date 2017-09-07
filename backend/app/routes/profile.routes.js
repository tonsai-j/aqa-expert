module.exports = function (app) {
    var control = require('../controllers/profile.controller')
    app.put('/', control.update);
}