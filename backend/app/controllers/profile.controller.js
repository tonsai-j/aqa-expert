exports.update = function (req, res) {
    var data = {};
    data[req.body.field] = req.body.data;
    var profile = r.table('profile').get(req.body.id);
    r.branch(profile.eq(null), null, profile.update(data))
        .run()
        .then(function (data) {
            res.json(data)
        })
}