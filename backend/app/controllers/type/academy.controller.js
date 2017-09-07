exports.list = function (req, res) {
    var query = r.table('type_academy');
    if (typeof req.query.work_group_id !== 'undefined' && req.query.work_group_id != '')
        query = query.getAll(req.query.work_group_id, { index: 'work_group_id' })

    query
        .orderBy('id')
        .run()
        .then(function (data) {
            res.json(data)
        })
}