exports.import = (req, res) => {
    const r = req.r;
    const dbName = req.params.dbName.toLowerCase();
    req.jdbc.query("mssql", `
    SELECT *
    from ${dbName}
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
                        const d = new Date(data[objDate[i]]);
                        if(d.getFullYear()>=2000){
                            obj[objDate[i]] = r.ISO8601(d.toISOString()).inTimezone('+07');
                        }else{
                            obj[objDate[i]] = r.now().inTimezone('+07');
                        }  
                    }
                    return obj;
                });
                r.branch(r.db('aqa_cds').tableList().contains(dbName),
                    r.db('aqa_cds').table(dbName).delete(),
                    r.db('aqa_cds').tableCreate(dbName)
                ).do((d) => {
                    return r.db('aqa_cds').table(dbName).insert(newDatas)
                }).run().then((result) => {
                    res.json(result);
                });
            } else {
                res.json(`DBNAME: ${dbName.toUpperCase()} IS EMPTY!`);
            }
        });
};