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
        case 'BASICYN':  //ระดับพื้นฐาน (ทั่วไป)
            type = { BASICYN: 'Y' }
            break;
        case 'CAMPUSYN':
            type = { CAMPUSYN: 'Y' }
            break;
        case 'CHILDHOODYN': //"ศูนย์พัฒนาเด็ก",
            type = { CHILDHOODYN: 'Y' }
            break;
        case 'EXTEDUCENTERYN':
            type = { EXTEDUCENTERYN: 'Y' }
            break;
        case 'VOCATIONALYN': //"วิทยาลัย
            type = { VOCATIONALYN: 'Y' }
            break;
        case 'HIGHERYN': // อุดมศึกษา
            type = { HIGHERYN: 'Y' }
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
        // .pluck('label', 'value', 'ACADEMYTYPID')
        .run()
        .then(function (data) {
            res.json(data)
        })
}