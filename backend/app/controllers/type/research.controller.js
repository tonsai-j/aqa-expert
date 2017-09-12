exports.list = function (req, res) {
    r.table('type_research')
        .orderBy('type_research_name')
        .run()
        .then(function (data) {
            res.json(data)
        })
}