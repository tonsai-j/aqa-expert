exports.list = function (req, res) {
    let DOCTYPCODE = req.query.code || ''
    if (DOCTYPCODE.search(',') > -1) {
        DOCTYPCODE = DOCTYPCODE.split(',')
    } else {
        DOCTYPCODE = [DOCTYPCODE]
    }
    // console.log(DOCTYPCODE);
    // 9001,9002
    // r.db('aqa_cds').table('doctyp').getAll(r.args(DOCTYPCODE), { multi: true, index: 'DOCTYPCODE' })
    r.db('aqa_cds').table('doctyp').getAll(r.args(DOCTYPCODE), { index: 'DOCTYPCODE' })
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('DOCTYPDESC'),
                value: row('DOCTYPCODE'),
            }
        })
        .orderBy('DOCTYPCODE')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}