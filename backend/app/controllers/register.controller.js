exports.post = function (req, res) {
    var p = r.table('profile').getAll([req.body.taxno, req.body.type_assessor_id], { index: 'taxNoTypeAssessor' });
    r.branch(
        p.count().eq(0),
        r.table('profile').get(
            r.table('profile').insert(
                r.expr(req.body)
                    .merge({
                        type_assessor: r.table('type_assessor').get(req.body.type_assessor_id)
                    })
            )('generated_keys')(0)
        ),
        p(0)
    )
        .run()
        .then(function (data) {
            res.json(data)
        })
}