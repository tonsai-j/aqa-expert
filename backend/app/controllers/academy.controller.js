exports.list = function (req, res) {
    var typeAcademy = req.query.type_academy_id;
    if (typeAcademy === '' || typeAcademy === undefined)
        res.send('Data Not Found')

    r.db('aqa_cds').table('academylist')
        .getAll(typeAcademy, { "index": "ACADEMYLISTTYPCD" })
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('ACADEMYLISTDESC'),
                value: row('ACADEMYLISTTYPCD'),
            }
        })
        .orderBy('PRIORITY')
        .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}

exports.filter = function (req, res) {
    var ACADEMYTYPCD = req.query.ACADEMYTYPCD || ''
    var groupWorkId = req.query.group_work_id || ''
    let search = req.query.search || ''
    let filter = {}
    if (groupWorkId !== '')
        filter.ONESQAWORKGRPCD = groupWorkId
    if (ACADEMYTYPCD !== '')
        filter.ACADEMYTYPCD = ACADEMYTYPCD
    // if (typeAcademy === '' || typeAcademy === undefined)
    //     res.send('Data Not Found')

    // r.db('aqa_cds').table('academy')//.getAll('H02500', { index: 'SIXORGID' })
    //     .pluck('ACADEMYTYPID', 'ACTIVE', 'ORGNBR', 'SIXORGID')
    //     .eqJoin('ORGNBR', r.db('aqa_cds').table('org'), { index: 'ORGNBR' })
    //     .pluck("left", { right: ['ORGTHAICOMPLETENAME', 'ORGNAME', 'ORGNBR'] })
    //     .zip()
    //     // .filter(function (doc) {
    //     //     return doc('ORGTHAICOMPLETENAME').match(search)
    //     // })
    //     .eqJoin(r.row('ACADEMYTYPID').coerceTo('number'), r.db('aqa_cds').table('academytyp'), { index: 'ACADEMYTYPID' })
    //     .pluck("left", { right: ['ACADEMYTYPDESC', 'ACADEMYTYPID', 'ACADEMYTYPCD', 'ONESQAWORKGRPCD'] })
    //     .zip()
    //     .filter(filter)
    //     // .limit(50)
    //     .merge(function (val) {
    //         return {
    //             label: val('ORGTHAICOMPLETENAME'),
    //             value: val('SIXORGID')
    //         }
    //     })
    //     .orderBy('ORGTHAICOMPLETENAME')
    r.db('aqa_cds').table('academytyp').getAll(filter.ONESQAWORKGRPCD, { index: 'ONESQAWORKGRPCD' })
        .filter({ ACTIVE: true })

        // .pluck('ACADEMYTYPDESC', 'ACADEMYTYPID', 'ACTIVE', 'BASICYN', 'CAMPUSYN', 'CHILDHOODYN',
        // 'EXTEDUCENTERYN', 'HIGHERYN', 'PRIORITY', 'ONESQAWORKGRPCD')
        .innerJoin(r.row('ACADEMYTYPID').coerceTo('string'), r.db('aqa_cds').table('academy'), { index: 'ACADEMYTYPID' })
        
        // const orgnbr = r.db('aqa_cds').table('academy')
        //     .getAll('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '35', '36', '37', { index: 'ACADEMYTYPID' })
        //     .getField('ORGNBR')
        //     .coerceTo('array');
        // // .do(function(d){
        // // return 
        // const orgId = r.db('aqa_cds').table('org').getAll(r.args(orgnbr), { index: 'ORGNBR' })
        //     .pluck('ORGNBR', 'ORGTHAICOMPLETENAME')
        //     // })
        //     // .filter(function (f) {
        //     //     return f('ORGTHAICOMPLETENAME').match('บ้าน')
        //     // })
        //     .eqJoin(r.row('ORGNBR'), r.db('aqa_cds').table('academy'), { index: 'ORGNBR' })
        //     .pluck("left", { right: ['ACADEMYTYPID', 'ACTIVE', 'ORGNBR', 'SIXORGID'] })
        //     .zip()
        //     .filter({ ACTIVE: '1' })
        //     .coerceTo('array');

        // // r.db('aqa_cds').table('org').getAll(r.args(orgId), { index: 'ORGTHAICOMPLETENAME' })
        // //     .eqJoin(r.row('ORGNBR'), r.db('aqa_cds').table('academy'), { index: 'ORGNBR' })
        // //     .pluck("left", { right: ['ACADEMYTYPID', 'ACTIVE', 'ORGNBR', 'SIXORGID'] })
        // //     .zip()
        // // .filter({ ACTIVE: '1' })

        // orgId
        // .limit(1000)
        .run()
        .then(function (data) {
            res.json(data)
        })
}
