var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
var stream = require('stream');

exports.uploadPic = function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        // console.log(files);
        var prefile = files.file[0]
        let time = new Date().getTime()
        let fileName = prefile.headers['content-disposition'].split('"')[3]
        let pic_type = req.headers.pic_type
        let user_id = req.headers.user_id
        // let newFileName = time + '-' + fileName
        let con = 'content-type'
        let typeImage = '.' + prefile.headers[con].split('/')[1]
        let newFileName = user_id + typeImage
        let pathUrl = 'images/pic_profile/'
        let dateNow = new Date().getTime()
        // console.log(dateNow);
        // let url = pathUrl + newFileName + typeImage
        // console.log(prefile);
        // console.log(typeImage);
        // console.log(user_id);
        // let table = r.db('aqa_expert').table('image_file')
        switch (pic_type) {
            case 'profile':
                pathUrl = 'images/pic_profile/'
                break;
            case 'bank':
                pathUrl = 'images/pic_bank/'
                break;
            case 'files':
                newFileName = dateNow + '-' + prefile.originalFilename
                pathUrl = 'files/'
                break;
            case 'files_meeting':
                newFileName = dateNow + '-' + prefile.originalFilename
                pathUrl = 'files_meeting/'
                break;
            default:
                break;
        }
        // console.log(pathUrl);
        let url = pathUrl + newFileName
        fs.readFile(prefile.path, function (err, data) {
            // console.log(data);
            fs.writeFile('./../' + url, data, ['utf8'], (err) => {
                if (err) {
                    // return console.log(err)
                    res.json(err)
                }
                let data = {
                    newFileName: newFileName,
                    url: url
                }
                res.json(data)

            })
        })

    })

    return
}