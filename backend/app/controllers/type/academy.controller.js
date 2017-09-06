exports.list = function (req, res) {
    r.table('type_academy')
        .orderBy('id')
        .run()
        .then(function (data) {
            res.json(data)
        })
}