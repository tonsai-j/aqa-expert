exports.list = function (req, res) {
    r.table('work_status')
        .orderBy('work_status_name_th')
        .run()
        .then(function (data) {
            res.json(data)
        })
}