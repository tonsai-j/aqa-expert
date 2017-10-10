const jwt = require('jsonwebtoken')
const sha1 = require('sha1')
// const Joi = require('joi')

const secret = require('../../../config/secret')

//const profileModel = require('../../models/aqa_expert/profile.model');


exports.login = (req, res) => {
    const r = req.r
    const body = req.body
    
    r.db('aqa_user').table('user').getAll([body.username,sha1(body.password)],{index:'login'}).coerceTo('array')
    .merge(function(row){
        return {
            admin: row('role_id').map(function(row2){
                return r.db('aqa_user').table('role').get(row2)
            }).filter({name:'ผู้ดูแล'})
            .do(function(data){
                return data.count().eq(0).not()
            })
        }
    })
    .do(function(info){
        return r.branch(info.count().eq(0),{loginFailed:true},info(0))
    })
    .run()
    .then((result) => {
        if(!result.loginFailed){
            //result.finger_print = req.headers['finger-print']
            var token = jwt.sign(result, secret, { expiresIn: '1d' })
            res.json({token});
            //res.json(result)
        }else{
            res.status(401).send({msg:'login failed'});
        }
    })
    .catch((err) => {
        res.status(500).send(err);
    })
  
}

// exports.authTaxno = (req,res) => {
//     const r = req.r
//     const body = req.body

//     const validate = Joi.validate(body, profileModel.auth)
//     if(validate.error)
//         return res.status(400).send(validate.error)

//     r.db('aqa_expert').table('profile').getAll(body.taxno,{index:'taxno'})(0)
//     .do(function(row){
//         return {
//             id:row('id'),
//             type:'taxno',
//             refId:row('taxno'),
//             info:row('basic').pluck('firstname_en','lastname_en','firstname_th','lastname_th')
//         }
//     })
//     .run()
//     .then((result) => {
//         res.json(result)
//         // res.status(401).send({msg:'login failed'})
//     })
//     .catch((err) => {
//         console.log(err)
//         res.status(401).send({msg:'login failed'})
//     })

// }
  

//   exports.transform = (req, res) => {
//     const r = req.r
//     const body = req.body
//     var token = jwt.sign({token: req.headers['token']}, secret, { expiresIn: '10s' })
//     res.json({token})
//   }

//   exports.verifyTransform = (req, res) => {
//     const r = req.r
//     const params = req.query
    
//     jwt.verify(params.source, secret,function(err, decoded) {
//         if(err){
//             res.status(401).json(err)
//         }else{
//             res.json(decoded)
//         }
//     });
    

//   }

//   exports.verifyToken = (req, res) => {
//     const r = req.r
    
//     jwt.verify(req.headers['token'], secret,function(err, decoded) {
//         if(err){
//             res.status(401).json(err)
//         }else{
//             res.json(decoded)
//         }
//     });
    

//   }


  exports.user = (req, res) => {
    res.json(req.user)
  }