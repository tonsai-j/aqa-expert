exports.list = function (req, res) {
    r.db('aqa_cds').table('workstatus')
    .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('WORKSTATUSDESC'),
                value: row('WORKSTATUSCD'),
            }
        })
        .orderBy('WORKSTATUSCD')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}