exports.list = function (req, res) {
    r.db('aqa_cds').table('nationality')
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('NATIONALITYTHAIDESC'),
                value: row('NATIONALITYCD'),
            }
        })
        .orderBy('NATIONALITYCD')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}