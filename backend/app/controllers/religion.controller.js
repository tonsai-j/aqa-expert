exports.list = function (req, res) {
    r.table('religion')
        .orderBy('religion_name_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}