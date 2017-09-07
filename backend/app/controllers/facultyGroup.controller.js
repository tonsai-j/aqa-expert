exports.list = function (req, res) {
    r.table('faculty_group')
        .orderBy('id')
        .run()
        .then(function (data) {
            res.json(data)
        })
}