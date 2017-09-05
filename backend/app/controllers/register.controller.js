exports.post = function (req, res) {
    var p = r.table('profile').getAll([req.body.taxno, req.body.level_id], { index: 'taxNoLevelId' });
    r.branch(
        p.count().eq(0),
        r.table('profile').get(
            r.table('profile').insert(
                r.expr(req.body)
                    .merge({
                        level: r.table('level').get(req.body.level_id)
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