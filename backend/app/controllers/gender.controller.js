exports.list = function (req, res) {
    r.table('gender')
        .orderBy('gender_name_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}