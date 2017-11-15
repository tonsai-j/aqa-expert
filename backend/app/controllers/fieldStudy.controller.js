exports.list = function (req, res) {
    r.db('aqa_cds').table('field')
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('FIELDDESC'),
                value: row('FIELDCD'),
            }
        })
        .orderBy('PRIORITY')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}