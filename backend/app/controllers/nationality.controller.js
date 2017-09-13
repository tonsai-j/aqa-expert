exports.list = function (req, res) {
    r.table('nationality')
        .orderBy('old_id')
        .run()
        .then(function (data) {
            res.json(data)
        })
}