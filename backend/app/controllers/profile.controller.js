exports.update = function (req, res) {
    var data = req.body.data;
    if (Array.isArray(data)) {
        for (var index in data) {
            data[index] = convertDate(data[index]);
        }
    } else {
        data = convertDate(data)
    }
    const keys = req.body.field.split('.');
    let obj = {};
    if (keys.length > 1) {
        obj[keys[0]] = { [keys[1]]: r.literal(data) };
    } else {
        obj[keys[0]] = data;
    }
    var profile = r.table('profile').get(req.body.id);
    r.branch(profile.eq(null), null, profile.update(obj))
        .run()
        .then(function (data) {
            res.json(data)
        })
    function convertDate(data) {
        for (var key in data) {
            if (key.indexOf('date_') > -1 || key.indexOf('_date') > -1) {
                data[key] = r.ISO8601(data[key]).inTimezone('+07')
            }
        }
        return data;
    }
}
exports.meeting = function (req, res) {
    r.db('aqa_meeting').table('participant')
        .getAll([req.query.taxno, true], { index: 'taxnoConfirm' })
        .run()
        .then(function (data) {
            res.json(data)
        })
}
exports.approve = function (req, res) {
    var approve = true;
    if (typeof req.query.approve !== 'undefined' && req.query.approve == 'false') approve = false;
    r.table('profile').getAll(approve, { index: 'approve' })
        .pluck('id', 'taxno', 'basic', 'properties', 'exam', 'type_assessor')
        .run()
        .then(function (data) {
            res.json(data)
        })
}
exports.getById = function (req, res) {
    r.table('profile').get(req.query.id)
        .run()
        .then(function (data) {
            res.json(data)
        })
}

