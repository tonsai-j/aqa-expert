exports.list = function (req, res) {
    r.table('academic_position')
        .orderBy('academic_position_name_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}