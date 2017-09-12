exports.list = function (req, res) {
    r.table('nationality')
        .orderBy('nationality_name_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}