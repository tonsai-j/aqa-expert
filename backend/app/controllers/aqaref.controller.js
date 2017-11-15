
exports.list = function (req, res) {
    // console.log(req.query);
    let filter = req.query
    // console.log(querystring.parse(req.query));
    r.db('aqa_cds').table('aqaref')
        .filter({ ACTIVE: true })
        .filter(filter)
        // .merge((row) => {
        //     return {
        //         label: row('BANKDESC'),
        //         value: row('BANKCD'),
        //     }
        // })
        .orderBy('PRIORITY')
        // .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}