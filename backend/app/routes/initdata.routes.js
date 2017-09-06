module.exports = function (app) {
    var control = require('../controllers/initdata.controller');
    app.get('/', control.init);
}