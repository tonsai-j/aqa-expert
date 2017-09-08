exports.list = function (req, res) {
    r.table('region')
        .orderBy('region_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}