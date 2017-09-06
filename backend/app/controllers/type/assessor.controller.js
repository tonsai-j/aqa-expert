exports.list = function (req, res) {
    r.table('type_assessor')
        .orderBy(r.row('id').coerceTo('number'))
        .run()
        .then(function (data) {
            res.json(data)
        })
}