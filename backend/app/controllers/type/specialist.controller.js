exports.list = function (req, res) {
    r.table('type_specialist')
        .orderBy('type_specialist_name')
        .run()
        .then(function (data) {
            res.json(data)
        })
}