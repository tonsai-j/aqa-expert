module.exports = function (app) {
    var control = require('../controllers/profile.controller')
    app.route('/')
        .get(control.getById)
        .put(control.update);
    app.get('/meeting', control.meeting);
    app.get('/approve', control.approve);

}