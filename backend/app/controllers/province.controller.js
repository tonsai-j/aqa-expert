exports.list = function (req, res) {
    r.table('province')
        .orderBy('province_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}