module.exports = function (app) {
    var bank = require('../controllers/bank.controller');
    app.get('/', bank.list)
}