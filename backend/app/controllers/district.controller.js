exports.list = function (req, res) {
    var tb = r.db('aqa_cds').table('district').limit(100)
    let PROVINCECD = req.query.province_id
    if (PROVINCECD) {
        tb = r.db('aqa_cds').table('district').getAll(PROVINCECD, { "index": "PROVINCECD" })
    }
    tb
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('DISTRICTDESC'),
                value: row('DISTRICTCD'),
            }
        })
        .orderBy('DISTRICTCD')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}
exports.sub = function (req, res) {
    var tb = r.db('aqa_cds').table('subdistrict').limit(100)
    let DISTRICTCD = req.query.district_id
    if (DISTRICTCD) {
        tb = r.db('aqa_cds').table('subdistrict').getAll(DISTRICTCD, { "index": "DISTRICTCD" })
    }
    tb
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('SUBDISTRICTDESC'),
                value: row('SUBDISTRICTCD'),
            }
        })
        .orderBy('SUBDISTRICTCD')
        // .pluck('label', 'value', 'ZIPCODE')
        .run()
        .then(function (data) {
            res.json(data)
        })
}