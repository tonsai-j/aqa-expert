exports.list = function (req, res) {
    r.db('aqa_cds').table('MOCK_ActOtherTyp')
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('course_desc'),
                value: row('course_id'),
            }
        })
        .orderBy('PRIORITY')
        .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}