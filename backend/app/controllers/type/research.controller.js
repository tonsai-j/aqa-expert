exports.list = function (req, res) {
    r.db('aqa_cds').table('researchtyp')
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('RESEARCHTYPDESC'),
                value: row('RESEARCHTYPCD'),
            }
        })
        .orderBy('RESEARCHTYPCD')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}