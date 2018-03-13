let elasticSearch = {
    createData: (name, data) => {
        console.log("name", name);
        console.log("data", data);
        client.index({
            index: 'status',
            id: parseInt(new Date().getTime()),
            type: 'status',
            body: {
                "name":name,
                "data": data,
                //"createdAt":new Date()
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
        //let query = {};
        //query['index'] = 'status';
        //query["type"] = 'status';
        ////query["id"] = "1520921088184";
        //if (data.statusCode) {
        //    query['body'] = {
        //        query: {
        //            "range": {
        //                //"data": data.statusCode,
        //                "id": {
        //                    "gte":"1520925506762",
        //                    "lte":"1520925519272"
        //                }
        //            }
        //        }
        //    }
        //}
        //console.log("query", JSON.stringify(query));
        //return new Promise((resolve, reject) => {
        //    client.search(query, function (err, result, status) {
        //        if (err) {
        //            console.log("err", err);
        //            return reject(err);
        //        }
        //        else {
        //            //console.log("result",result);
        //            return resolve(result);
        //        }
        //    });
        //})

        client.search({
            index: "status",
            //size : 100,
            //from: 0,
            type:"status",
            body: {
                query: {
                    filtered:{
                        filter:{
                            bool:{
                                must: [{"range":{"id":{"gte":"1520925506762","lt":"1520925519272"}}}]
                            }
                        }
                    }
                }
            }
        },function(err,result){
            if(err){
                console.log("err",err);
                //return reject(err)
            }else{
                console.log("result",result);
                //return resolve(result);
            }
        })
    }
};

module.exports = elasticSearch;

