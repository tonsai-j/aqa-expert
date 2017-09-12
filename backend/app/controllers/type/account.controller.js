exports.list = function (req, res) {
    r.table('type_account')
        .orderBy('type_account_name_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}