module.exports = function (app) {
    var workpos1 = require('../controllers/workpos1.controller');
    app.get('/', workpos1.list)
}