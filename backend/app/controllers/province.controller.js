exports.list = function (req, res) {
    var tb = r.db('aqa_cds').table('province').getAll(true, { index: 'ACTIVE' })
    let REGIONCD = Number(req.query.region_id)
    if (req.query.region_id) {
        tb = r.db('aqa_cds').table('province').getAll(REGIONCD, { "index": "REGIONCD" })
            .filter({ ACTIVE: true })
    }
    tb
        .merge((row) => {
            return {
                label: row('PROVINCEDESC'),
                value: row('PROVINCECD'),
            }
        })
        .orderBy('PROVINCEID')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}