exports.list = function (req, res) {
    r.table('salu')
        .orderBy('salu_name_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}