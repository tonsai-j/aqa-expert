module.exports = function (app) {
    var controller = require('../controllers/upload.controller')
    // app.get('/',controller.listUpload)
    app.post('/uploadpic', controller.uploadPic)
}