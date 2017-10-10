exports.year = function (req, res) {
    r.db('aqa_meeting').table('participant').getAll('training', { index: 'meeting_type' }).group(r.row('meeting')('meeting_year')).ungroup().merge(
        function (m) {
            return {
                invite: m('reduction').count(),
                email: m('reduction').filter({ email: true }).count(),
                confirm: m('reduction').filter({ confirm: true }).count()
            }
        }
    ).without('reduction')
        .run()
        .then(function (data) {
            res.json(data)
        })
}