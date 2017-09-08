exports.list = function (req, res) {
    r.table('specialisttype')
        .orderBy('specialisttype_name')
        .run()
        .then(function (data) {
            res.json(data)
        })
}