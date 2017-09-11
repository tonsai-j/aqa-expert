exports.list = function (req, res) {
    var typeAcademy = req.query.type_academy_id;
    var groupWork = req.query.group_work_id;
    var query = r.table('academy');

    if (typeof groupWork !== 'undefined' && typeof typeAcademy !== 'undefined') {
        query = query.getAll([groupWork, typeAcademy], { index: 'groupWorkIdTypeAcademyId' })
    } else if (typeof groupWork !== 'undefined' && typeof typeAcademy === 'undefined') {
        query = query.getAll(groupWork, { index: 'group_work_id' })
    } else if (typeof groupWork === 'undefined' && typeof typeAcademy !== 'undefined') {
        query = query.getAll(groupWork, { index: 'type_academic_id' })
    }

    query.orderBy('academy_name')
        .run()
        .then(function (data) {
            res.json(data)
        })
}