module.exports = function (app) {
    var faculty = require('../controllers/faculty.controller');
    app.get('/', faculty.list)
}