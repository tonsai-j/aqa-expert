exports.list = function (req, res) {
    r.table('group_specialist')
        .orderBy('group_specialist_name')
        .run()
        .then(function (data) {
            res.json(data)
        })
}