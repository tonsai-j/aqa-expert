exports.list = function (req, res) {
    r.db('aqa_cds').table('faculty')
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('FACULTYDESC'),
                value: row('FACULTYCD'),
            }
        })
        .orderBy('FACULTYCD')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}