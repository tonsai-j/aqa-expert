module.exports = function (app) {
    var faculty = require('../../controllers/group/faculty.controller');
    app.get('/', faculty.list)
}