exports.get = function (req, res) {
    r.table('level')
        .orderBy('id')
        .run()
        .then(function (data) {
            res.json(data)
        })
}