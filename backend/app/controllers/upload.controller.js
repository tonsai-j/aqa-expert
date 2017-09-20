var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
var stream = require('stream');

exports.uploadPic = function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var prefile = files.file[0]
        let time = new Date().getTime()
        let fileName = prefile.headers['content-disposition'].split('"')[3]
        let pic_type = req.headers.pic_type
        let user_id = req.headers.user_id
        let newFileName = time + '-' + fileName
        let pathUrl = 'images/pic_profile/'

        let table = r.db('aqa_expert').table('image_file')
        switch (pic_type) {
            case 'profile':
                pathUrl = pathUrl
                break;
            case 'bank':
                pathUrl = 'images/pic_bank/'
                break;
            default:
                break;
        }
        fs.readFile(prefile.path, function (err, data) {
            // console.log(data);
            fs.writeFile('./../' + pathUrl + newFileName, data, ['utf8'], (err) => {
                if (err) {
                    return console.log(err);
                }
                else {
                    let data = {
                        file_name: newFileName,
                        user_id: user_id,
                        pic_type: pic_type,
                        file_path: pathUrl,
                        data_uploaded: r.now().inTimezone('+07'),
                    }
                    // table
                    //     .getAll([user_id, pic_type], { index: "user_idPic_type" })
                    //     // .delete()
                    //     .run()
                    //     .then((result) => {
                    //         for (var index = 0; index < result.length; index++) {
                    //             // ../ คือออกไปข้างนอกหนึ่งขั้น
                    //             let pathPic = path.resolve('../', result[index].file_path, result[index].file_name)
                    //             console.log(pathPic);
                    //             // fs.unlinkSync(pathPic);
                    //             fs.stat(pathPic, (err, stats) => {
                    //                 console.log(1111);
                    //                 console.log(stats);//here we got all information of file in stats variable

                    //                 if (err) {
                    //                     return console.error(err);
                    //                 }

                    //                 fs.unlink(pathPic, (err) => {
                    //                     if (err) return console.log(err);
                    //                     console.log('file deleted successfully');
                    //                 });
                    //             });
                    //             // fs.unlink('./server/upload/my.csv', function (err) {
                    //             //     if (err) return console.log(err);
                    //             //     console.log('file deleted successfully');
                    //             // });
                    //         }
                    //         res.json(result);
                    //         // table
                    //         //     .getAll([user_id, pic_type], { index: "user_idPic_type" })
                    //         //     .delete()
                    //         //     .run()
                    //     })
                        // .then((result) => {
                            table
                                .insert(data)
                                .run()
                        // })
                        .then((result) => {
                            res.json(result);
                        })
                        .catch((err) => {
                            res.json(err);
                        })
                }
            })
        })

    })

    return
}