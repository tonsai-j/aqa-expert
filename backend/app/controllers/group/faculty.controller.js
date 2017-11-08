exports.list = function (req, res) {
    r.db('aqa_cds').table('fieldgrp')
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('FIELDGRPDESC'),
                value: row('FIELDGRPCD'),
            }
        })
        .orderBy('PRIORITY')
        .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}