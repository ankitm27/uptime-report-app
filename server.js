const express = require('express');
const app = express();
const elasticSearch = require('elasticsearch');
const http = require("http");
const request = require('request');
const cmd = require('node-cmd');
const elasticSearchFile = require('./elasticSearch.js');
const _ = require('underscore');

var client = new elasticSearch.Client({
    host: 'localhost:9200'
});

GLOBAL.client = client;

let curlRequest = (website) => {
    return new Promise((resolve, reject) => {
        cmd.get('curl -Is ' + website + ' | head -1', function (err, data, stderr) {
            if (err) {
                return resolve(err);
            } else {
                data = data.split(" ")[1];
                return resolve(data);
            }
        })
    })
};


app.get('/checkuptime', (req, res) => {
    const websiteName = req.query.websiteName;
    console.log("websiteName",websiteName);
    let promiseCall = [];
    promiseCall.push(curlRequest("https://" + websiteName));
    promiseCall.push(curlRequest("http://" + websiteName));
    Promise.all(promiseCall)
        .then((result) => {
            console.log("result",result);
            if (result.indexOf('200') > -1) {
                elasticSearchFile.createData(websiteName, '200');
                res.send({"statusCode": 200, "status": "success", data: 200});
            } else {
                elasticSearchFile.createData(websiteName, '404');
                res.send({"statusCode": 200, "status": "error", data: 404});
            }
        }).catch((err) => {
            res.send({"statusCode": 500, "status": "error", data: 404});
        })
});


app.get('/getdata', (req, res) => {
    let data = {};
    data['websiteName'] = req.query.websiteName;
    data["statusCode"] = req.query.statusCode;
    if(req.query.startTime){
        data["startTime"] = req.query.startTime;
    }
    if(req.query.endTime){
        data["endTime"] = req.query.endTime;
    }
    elasticSearchFile.searchData(data)
        .then((result) => {
            let resultData = [];
            result.hits.hits.forEach(function (hit) {
                resultData.push(_.pick(hit._source,'data','timeStamp'));
            });
            return res.send(resultData);
        }).catch((err) => {
            return res.send(err);
        })
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});