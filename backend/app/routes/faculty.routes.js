module.exports = function (app) {
    var faculty = require('../controllers/faculty.controller');
    var facultyGroup = require('../controllers/facultyGroup.controller');
    app.get('/', faculty.list)
    app.get('/group', facultyGroup.list)
}