exports.list = function (req, res) {
    r.table('edu_level')
        .orderBy('id')
        .run()
        .then(function (data) {
            res.json(data)
        })
}