exports.update = function (req, res) {
    var data = req.body.data;
    var obj = {}
    if (Array.isArray(data)) {
        for (var index in data) {
            data[index] = convertDate(data[index]);
        }
    } else {
        data = convertDate(data)
    }
    obj[req.body.field] = data;
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