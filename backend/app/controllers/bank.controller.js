exports.list = function (req, res) {
    r.db('aqa_cds').table('bank')
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('BANKDESC'),
                value: row('BANKCD'),
            }
        })
        .orderBy('PRIORITY')
        .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}