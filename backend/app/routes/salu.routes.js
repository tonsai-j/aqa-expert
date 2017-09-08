module.exports = function (app) {
    var salu = require('../controllers/salu.controller');
    app.get('/', salu.list)
}