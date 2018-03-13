let elasticSearch = {
    createData: (name, data) => {
        client.index({
            index: 'status2',
            id: parseInt(new Date().getTime()),
            type: 'status2',
            body: {
                "name": name,
                "data": data,
                "timeStamp": parseInt(new Date().getTime())
            }
        }, function (err, resp, status) {
            if (err) {
                console.log("err", err);
            } else {
                console.log("resp", resp);
            }
        });
    },
    searchData: (data) => {
        let query = {};
        query['index'] = 'status2';
        query["type"] = 'status2';
        let must = [];
        let should = [];
        if (data.statusCode) {
            data.statusCode = JSON.parse(data.statusCode);
            data.statusCode.forEach((status) => {
                should.push({term:{'data':status}})
            });
        }
        if (data.startTime) {
            must.push({
                range: {
                    timeStamp: {
                        'gte': data.startTime
                    }
                }
            })
        }
        if (data.endTime) {
            must.push({
                range: {
                    timeStamp: {
                        'lte': data.endTime
                    }
                }
            })
        }
        query['body'] = {
            "stored_fields":["_source"],
            query: {
                bool: {
                    must: must,
                    should: should
                }
            }
        };
        return new Promise((resolve, reject) => {
            client.search(query, function (err, result, status) {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(result);
                }
            });
        })
    }
};

module.exports = elasticSearch;

