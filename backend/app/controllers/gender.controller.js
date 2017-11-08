exports.list = function (req, res) {
    r.db('aqa_cds').table('gender')
        .merge((row)=>{
            return {
                label : row('GENDERTHAIDESC'),
                value : row('GENDERCD'),
            }
        })
        .orderBy('GENDERCD')
        .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}