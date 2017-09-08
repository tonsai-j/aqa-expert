exports.list = function (req, res) {
    r.table('workpos1')
        .orderBy('workpos1_name_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}