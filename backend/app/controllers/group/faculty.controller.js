exports.list = function (req, res) {
    r.table('group_faculty')
        .orderBy('id')
        .run()
        .then(function (data) {
            res.json(data)
        })
}