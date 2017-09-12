exports.list = function (req, res) {
    r.table('bank')
        .orderBy('bank_name_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}