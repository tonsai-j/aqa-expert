exports.cardId = function (req, res) {
    console.log(req.query.id)
    r.table('profile').get(req.query.id)
        .merge(function (m) {
            return {

                taxno: m('taxno'),
                name: m('basic')('prefix_th').add(m('basic')('firstname_th')).add(' ', m('basic')('lastname_th')),
                type_assessor_name: m('type_assessor')('type_assessor_name'),
                address: m('address')('address_contract')('home_number').add(' หมู่ที่ ', m('address')('address_contract')('village_no'))
                    .add(' ต. ', m('address')('address_contract')('district')).add(' อ. ', m('address')('address_contract')('amphoe'))
                    .add(' จ. ', m('address')('address_contract')('province')('province_th')).add(' ', m('address')('address_contract')('zipcode')),

            }
        })
        .pluck('taxno', 'name', 'type_assessor_name', 'address')


        .run()
        .then(function (data) {
            // res.json(data)
            res.ireport("reports/report3.jasper", req.query.export || "pdf", data)
        })
    // res.json('card id')
}

