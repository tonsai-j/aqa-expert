exports.list = function (req, res) {
    r.table('specialistgroup')
        .orderBy('specialistgroup_name')
        .run()
        .then(function (data) {
            res.json(data)
        })
}