module.exports = function(app){
    var authCtrl = require('../controllers/auth/auth.controller')
    app.post('/login',authCtrl.login)

    // app.post('/taxno',authCtrl.authTaxno)
    // app.get('/transform',authCtrl.transform)
    // app.get('/verifyToken',authCtrl.verifyToken)
    // app.get('/verifyTransform',authCtrl.verifyTransform)
    // app.get('/checkToken',authCtrl.checkToken)
}