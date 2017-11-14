module.exports = function (app) {
    var work = require('../../controllers/group/work.controller');
    app.get('/', work.list)
}