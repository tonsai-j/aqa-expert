exports.list = function (req, res) {
    r.table('research_type')
        .orderBy('research_type_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}