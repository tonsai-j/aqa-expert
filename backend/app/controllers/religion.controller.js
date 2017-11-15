exports.list = function (req, res) {
    r.db('aqa_cds').table('religion')
    .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('RELIGIONTHAIDESC'),
                value: row('RELIGIONCD'),
            }
        })
        .orderBy('PRIORITY')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}