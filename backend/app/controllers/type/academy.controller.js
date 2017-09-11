exports.list = function (req, res) {
    var query = r.table('type_academy');
    if (typeof req.query.group_work_id !== 'undefined' && req.query.group_work_id != '')
        query = query.getAll(req.query.group_work_id, { index: 'group_work_id' })

    query
        .orderBy('id')
        .run()
        .then(function (data) {
            res.json(data)
        })
}