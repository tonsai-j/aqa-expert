exports.list = function (req, res) {
    r.db('aqa_cds').table('specialgrp')
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('SPECIALGRPDESC'),
                value: row('SPECIALGRPCD'),
            }
        })
        .orderBy('SPECIALGRPCD')
        .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}