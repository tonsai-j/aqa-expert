exports.import = (req, res) => {
    const r = req.r;
    req.jdbc.query("mssql", `
    SELECT *
    from ${req.params.dbName}
` , []
        , function (err, datas) {
            datas = JSON.parse(datas);
            if (datas.length > 0) {
                const newDatas = datas.map((data, index) => {
                    const objDate = Object.keys(data).filter((key) => {
                        return key.substring(key.length - 4) === 'DATE';
                    })
                    let obj = data;
                    for (let i = 0; i < objDate.length; i++) {
                        obj[objDate[i]] = r.ISO8601(new Date(data[objDate[i]]).toISOString()).inTimezone('+07');
                    }
                    return obj;
                });
                r.branch(r.db('aqa_cds').tableList().contains(req.params.dbName),
                    r.db('aqa_cds').table(req.params.dbName).delete(),
                    r.db('aqa_cds').tableCreate(req.params.dbName)
                ).do((d) => {
                    return r.db('aqa_cds').table(req.params.dbName).insert(newDatas)
                }).run().then((result) => {
                    res.json(result);
                });
            } else {
                res.json(`DBNAME: ${req.params.dbName.toUpperCase()} IS EMPTY!`);
            }
        });
};