const express = require('express');
const app = express();
const elasticSearch = require('elasticsearch');
const http = require("http");
const request = require('request');
const cmd = require('node-cmd');

let curlRequest = (website) => {
    return new Promise((resolve, reject) => {
        cmd.get('curl -Is ' + website + ' | head -1', function (err, data, stderr) {
            if (err) {
                return resolve(err);
            } else {
                data  = data.split(" ")[1]
                return resolve(data);
            }
        })
    })
};


app.get('/checkuptime', (req, res) => {
    const websiteName = req.query.websitename;
    let promiseCall = [];
    promiseCall.push(curlRequest("https://" + websiteName));
    promiseCall.push(curlRequest("http://" + websiteName));
    Promise.all(promiseCall)
        .then((result) => {
            if(result.indexOf('200') > -1){
                res.send({"statusCode":200,"status":"success",data:200});
            }else{
                res.send({"statusCode":200,"status":"error",data:404});
            }
        }).catch((err) => {
            res.send({"statusCode":500,"status":"error",data:404});
        })
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});