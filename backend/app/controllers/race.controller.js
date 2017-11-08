exports.list = function (req, res) {
    r.db('aqa_cds').table('race')
    .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('RACETHAIDESC'),
                value: row('RACECD'),
            }
        })
        .orderBy('RACECD')
        .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}