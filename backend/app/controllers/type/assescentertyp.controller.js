exports.list = function (req, res) {
    r.db('aqa_cds').table('assescentertyp')
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('ASSESCENTERTYPDESC'),
                value: row('ASSESCENTERTYPCD'),
            }
        })
        .orderBy('ASSESCENTERTYPCD')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}
