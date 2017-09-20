var path = require('path');

exports.cardId = function (req, res) {
    // console.log(req.query.id)
    r.table('profile').get(req.query.id)
        .merge(function (mm) {
            return {
                image: r.db('aqa_expert').table('image_file').getAll([req.query.id, 'profile'], { index: "user_idPic_type" })
                    // .getAll(['2387c215-b769-4147-819c-291ab0c98152', 'profile'], { index: "user_idPic_type" })
                    .coerceTo('array')
            }
        })
        .merge(function (m) {
            return {

                taxno: m('taxno'),
                name: m('basic')('prefix_th').add(m('basic')('firstname_th')).add(' ', m('basic')('lastname_th')),
                type_assessor_name: m('type_assessor')('type_assessor_name'),
                address: m('address')('address_contract')('home_number').add(' หมู่ที่ ', m('address')('address_contract')('village_no'))
                    .add(' ต. ', m('address')('address_contract')('district')).add(' อ. ', m('address')('address_contract')('amphoe'))
                    .add(' จ. ', m('address')('address_contract')('province')('province_th')).add(' ', m('address')('address_contract')('zipcode')),
                file_name: m('image')('file_name')(0),
                file_path: m('image')('file_path')(0)
            }
        })
        .pluck('taxno', 'name', 'type_assessor_name', 'address', 'file_name', 'file_path')


        .run()
        .then(function (data) {
            var parameters = {
                IMAGE_DIR: path.resolve('../', data.file_path, data.file_name),
            };
            console.log(parameters)
            // res.json(data)
            res.ireport("reports/expert_card.jasper", req.query.export || "pdf", data, parameters)
        })
    // res.json('card id')
}

