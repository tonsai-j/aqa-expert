module.exports = function (app) {
    var ctrl = require('../controllers/rdb.controller')
    app.get('/import/:dbName', ctrl.import);
}