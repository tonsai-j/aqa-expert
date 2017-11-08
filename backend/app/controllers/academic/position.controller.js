exports.list = function (req, res) {
    r.db('aqa_cds').table('position')
        .filter({ ACTIVE: true , EDUCATIONYN : 'Y' })
        .merge((row)=>{
            return {
                label : row('POSITIONTHAIDESC'),
                value : row('POSITIONCD'),
            }
        })
        .orderBy('PRIORITY')
        .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}