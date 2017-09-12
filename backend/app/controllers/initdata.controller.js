var XLSX = require('xlsx');
exports.init = function (req, res) {
    var workbook = XLSX.readFile('../data/bank.xlsx');
    var file = workbook.Sheets;
    var data = [];
    for (var sheet in file) {
        data.push({
            table: sheet,
            data: XLSX.utils.sheet_to_json(file[sheet])
        });
    }
    // res.json(data)
    r.expr(data).forEach(function (row) {
        return r.tableList().contains(row('table'))
            .do(function (tbExists) {
                return r.branch(tbExists,
                    r.table(row('table')).delete(),
                    r.tableCreate(row('table'))
                ).do(function (tbInsert) {
                    return r.table(row('table')).insert(row('data'))
                })
            })
    })
        .run()
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
}