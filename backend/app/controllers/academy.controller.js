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
    let ACADEMYTYPCD = req.query.type_academy_id || ''
    var groupWorkId = req.query.group_work_id || '9003'
    let academy_name = req.query.academy_name || ''
    let amphoe_id = req.query.amphoe_id || ''
    let province_id = req.query.province_id || ''
    let sixorgid = req.query.sixorgid || ''
    sixorgid = sixorgid.toUpperCase()
    let filter = {}

    // console.log(ACADEMYTYPCD.search(',') > -1);
    if (ACADEMYTYPCD.search(',') > -1) {
        ACADEMYTYPCD = ACADEMYTYPCD.split(',')
        // console.log(num);
    } else {
        ACADEMYTYPCD = [ACADEMYTYPCD]
    }

    let orgnbr = r.db('aqa_cds').table('academy')
        .getAll(r.args(ACADEMYTYPCD), { index: 'ACADEMYTYPID' })
        .filter({ ACTIVE: '1' })
        .getField('ORGNBR')
        .coerceTo('array');
    // // .do(function(d){
    // // return 
    let orgId = r.db('aqa_cds').table('org').getAll(r.args(orgnbr), { index: 'ORGNBR' })
        .filter({ ACTIVE: '1' })
        .filter(function (f) {
            return f('ORGTHAICOMPLETENAME').match(academy_name)
        })
        .pluck('ORGNBR', 'ORGTHAICOMPLETENAME')

        .eqJoin(r.row('ORGNBR'), r.db('aqa_cds').table('academy'), { index: 'ORGNBR' })
        .pluck("left", { right: ['ACADEMYTYPID', 'ACTIVE', 'ORGNBR', 'SIXORGID'] })
        .zip()
        .filter(function (f) {
            return f('SIXORGID').match(sixorgid)
        })
        .eqJoin(r.row('ACADEMYTYPID').coerceTo('number'), r.db('aqa_cds').table('academytyp'), { index: 'ACADEMYTYPID' })
        .pluck("left", { right: ['ACADEMYTYPDESC'] })
        .zip()
        .eqJoin(r.row('ORGNBR'), r.db('aqa_cds').table('orgaddruse'), { index: 'ORGNBR' })
        .pluck("left", { right: ['ADDRNBR'] })
        .zip()
        .eqJoin(r.row('ADDRNBR'), r.db('aqa_cds').table('addr'), { index: "﻿ADDRNBR" })
        .pluck("left", { right: ['DISTRICTID', 'PROVINCEID'] })
        .zip()
        .coerceTo('array')

    if (province_id !== '') {
        orgId = orgId.filter({ PROVINCEID: province_id })
            .eqJoin(r.row('PROVINCEID').coerceTo('number'), r.db('aqa_cds').table('province'), { index: "PROVINCEID" })
            .pluck("left", { right: ['PROVINCEDESC'] })
            .zip()

        if (amphoe_id !== '') {
            orgId = orgId.filter({ DISTRICTID: amphoe_id })
                .eqJoin(r.row('DISTRICTID').coerceTo('number'), r.db('aqa_cds').table('district'), { index: "DISTRICTID" })
                .pluck("left", { right: ['DISTRICTDESC'] })
                .zip()
        } else {
            orgId = orgId
                .eqJoin(r.row('DISTRICTID').coerceTo('number'), r.db('aqa_cds').table('district'), { index: "DISTRICTID" })
                .pluck("left", { right: ['DISTRICTDESC'] })
                .zip()
        }
    } else {
        orgId = orgId
            .eqJoin(r.row('PROVINCEID').coerceTo('number'), r.db('aqa_cds').table('province'), { index: "PROVINCEID" })
            .pluck("left", { right: ['PROVINCEDESC'] })
            .zip()
            .eqJoin(r.row('DISTRICTID').coerceTo('number'), r.db('aqa_cds').table('district'), { index: "DISTRICTID" })
            .pluck("left", { right: ['DISTRICTDESC'] })
            .zip()
    }
    orgId
        // orgId
        .without('ACTIVE')
        // .pluck("SIXORGID",'ACADEMYTYPDESC','DISTRICTDESC','PROVINCEDESC','ORGTHAICOMPLETENAME')
        .orderBy('SIXORGID')
        .run()
        .then(function (data) {
            res.json(data)
        })
}
