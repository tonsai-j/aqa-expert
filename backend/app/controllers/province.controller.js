exports.list = function (req, res) {
    var tb = r.table('province')
    if (req.query.region_id) {
        tb = r.table('province').getAll(req.query.region_id, { "index": "region_old_id" })
    }
    tb.orderBy('province_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}