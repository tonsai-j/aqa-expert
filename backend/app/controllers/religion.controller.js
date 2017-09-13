exports.list = function (req, res) {
    r.table('religion')
        .orderBy('old_id')
        .run()
        .then(function (data) {
            res.json(data)
        })
}