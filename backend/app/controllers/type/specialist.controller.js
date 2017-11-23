exports.list = function (req, res) {
    let group_specialist_id = req.query.group_specialist_id
    r.db('aqa_cds').table('specialtyp')
        .getAll(group_specialist_id, { "index": "SPECIALGRPCD" })
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('SPECIALTYPDESC'),
                value: row('SPECIALTYPCD'),
            }
        })
        .orderBy('SPECIALTYPDESC')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}