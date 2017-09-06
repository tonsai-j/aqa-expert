exports.list = function (req, res) {
    var query = r.table('school');
    if (typeof req.query.type_academic_id !== 'undefined' && req.query.type_academic_id != '')
        query = query.getAll(req.query.type_academic_id, { index: 'type_academic_id' })

    query.orderBy('id')
        .run()
        .then(function (data) {
            res.json(data)
        })
}