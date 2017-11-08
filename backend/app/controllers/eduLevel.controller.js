exports.list = function (req, res) {
    r.db('aqa_cds').table('edulev')
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('EDULEVDESC'),
                value: row('EDULEVCD'),
            }
        })
        .orderBy('EDULEVCD')
        .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}