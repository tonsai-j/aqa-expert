exports.list = function (req, res) {
    r.table('faculty')
        .orderBy('faculty_name')
        .run()
        .then(function (data) {
            res.json(data)
        })
}