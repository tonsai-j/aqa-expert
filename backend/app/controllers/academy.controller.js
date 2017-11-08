exports.list = function (req, res) {
    var typeAcademy = req.query.type_academy_id;
    r.db('aqa_cds').table('academylist')
        .getAll(typeAcademy, { "index": "ACADEMYLISTTYPCD" })
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('ACADEMYLISTDESC'),
                value: row('ACADEMYLISTTYPCD'),
            }
        })
        .orderBy('PRIORITY')
        .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}
