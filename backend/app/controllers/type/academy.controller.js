exports.list = function (req, res) {
    r.db('aqa_cds').table('academylisttyp')
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('ACADEMYLISTTYPDESC'),
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
exports.listfilter = function (req, res) {
    // CHILDHOODYN		flag ศูนย์เด็กเล็ก
    // BASICYN	     	flag สถานศึกษาพื้นฐาน
    // VOCATIONALYN	    flag สถานศึกษาอาชีวะ
    // HIGHERYN	    	flag สถานศึกษาอุดมศึกษา
    let type = { HIGHERYN: 'Y' }
    switch (req.query.type) {
        case 'CHILDHOODYN':
            type = { CHILDHOODYN: 'Y' }
            break;
        case 'BASICYN':
            type = { BASICYN: 'Y' }
            break;
        case 'VOCATIONALYN':
            type = { VOCATIONALYN: 'Y' }
            break;
        default:
        case 'HIGHERYN':
            type = { HIGHERYN: 'Y' }
            break;
    }

    r.db('aqa_cds').table('academytyp')
        .filter(type)
        .filter({ ACTIVE: true })
        .merge((row) => {
            return {
                label: row('ACADEMYTYPNAME'),
                value: row('ACADEMYTYPCD'),
            }
        })
        .orderBy('PRIORITY')
        .pluck('label', 'value')
        .run()
        .then(function (data) {
            res.json(data)
        })
}