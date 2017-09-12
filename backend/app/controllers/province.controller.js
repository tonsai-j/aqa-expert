exports.list = function (req, res) {
    r.table('province').getAll(req.query.region_id, { "index":"region_old_id" })
        .orderBy('province_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}