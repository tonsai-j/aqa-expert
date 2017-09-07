exports.list = function (req, res) {
    r.table('field_study')
        .orderBy('field_study_name')
        .run()
        .then(function (data) {
            res.json(data)
        })
}