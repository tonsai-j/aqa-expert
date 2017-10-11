exports.post = function (req, res) {
    var p = r.table('profile').getAll(req.body.taxno, { index: 'taxno' });
    r.branch(
        p.count().eq(0),
        r.table('profile').get(
            r.table('profile').insert(
                r.expr(req.body)
                    .merge(function (m) {
                        return {
                            type_assessor: r.table('type_assessor').get(req.body.type_assessor_id),
                            // basic: m('basic').merge(function (m2) {
                            //     return r.branch(m2.hasFields('birth_date'), {
                            //         birth_date: r.ISO8601(m2('birth_date')).inTimezone('+07'),
                            //         expire_date: r.ISO8601(m2('expire_date')).inTimezone('+07'),
                            //         issue_date: r.ISO8601(m2('issue_date')).inTimezone('+07')
                            //     }, {})
                            // }),
                            properties: false,
                            meeting: false,
                            exam: false,
                            address: [],
                            contact: {
                                mail: {},
                                home: {},
                                work: {}
                            },
                            education: [],
                            specialist: [],
                            working: [],
                            skills: {
                                computer: {},
                                edu: {},
                                lang: {},
                                type: {}
                            },
                            assessment: [],
                            researches: [],
                            training: [],
                            bank: {},
                            zone: [],
                            references: [],
                            documents: []
                        }
                    })
            )('generated_keys')(0)
        ),
        r.table('profile').get(
            p(0)('id')
        ).update(r.expr(req.body))
            .do(function (d) {
                return r.table('profile').get(p(0)('id'))
            })
    )
        .run()
        .then(function (data) {
            res.json(data)
        })
}
exports.check = function (req, res) {
    r.table('profile').getAll(req.query.taxno, { index: 'taxno' }).pluck('taxno', 'type_assessor_id', 'type_assessor', 'basic')
        .run()
        .then(function (data) {
            res.json(data)
        })
}
