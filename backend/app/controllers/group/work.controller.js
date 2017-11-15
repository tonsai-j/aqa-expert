exports.list = function (req, res) {
    r.db('aqa_cds').table('MOCK_group_work')
        // .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('group_work_name'),
                value: row('type'),
            }
        })
        .orderBy('PRIORITY')
        .pluck('label', 'value','old_id')
        .run()
        .then(function (data) {
            res.json(data)
        })
}