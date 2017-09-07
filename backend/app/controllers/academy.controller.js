exports.list = function (req, res) {
    var typeAcademy = req.query.type_academic_id;
    var workGroup = req.query.work_group_id;
    var query = r.table('academy');

    if (typeof workGroup !== 'undefined' && typeof typeAcademy !== 'undefined') {
        query = query.getAll([workGroup, typeAcademy], { index: 'workGroupIdTypeAcademyId' })
    } else if (typeof workGroup !== 'undefined' && typeof typeAcademy === 'undefined') {
        query = query.getAll(workGroup, { index: 'work_group_id' })
    } else if (typeof workGroup === 'undefined' && typeof typeAcademy !== 'undefined') {
        query = query.getAll(workGroup, { index: 'type_academic_id' })
    }

    query.orderBy('academy_name')
        .run()
        .then(function (data) {
            res.json(data)
        })
}