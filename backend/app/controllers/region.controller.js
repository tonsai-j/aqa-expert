exports.list = function (req, res) {
    r.db('aqa_cds').table('region')
        .filter({ ACTIVE: true, ADDRYN: 'Y' })
        .merge((row) => {
            return {
                label: row('REGIONDESC'),
                value: row('REGIONCD'),
            }
        })
        .orderBy('REGIONCD')
        .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}