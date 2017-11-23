exports.list = function (req, res) {
    r.db('aqa_cds').table('assessortyp')
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('ASSESSORTYPDESC'),
                value: row('ASSESSORTYPCD'),
            }
        })
        .orderBy('ASSESSORTYPID')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}