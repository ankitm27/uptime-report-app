const express = require('express');
const app = express();
const elasticSearch = require('elasticsearch');
//const proxy = require('express-http-proxy');
const http = require("http");
var tunnel = require('tunnel');


var client = new elasticSearch.Client({
    host: 'localhost:9200',
    //log: 'trace'
});

//client.ping({
//    // ping usually has a 3000ms timeout
//    requestTimeout: 1000
//}, function (error) {
//    if (error) {
//        console.trace('elasticsearch cluster is down!');
//    } else {
//        console.log('All is well');
//    }
//});

//client.cluster.health({},function(err,resp,status) {
//    console.log("-- Client Health --",resp);
//});


//client.index({
//    index: 'gov',
//    id: '1',
//    type: 'constituencies',
//    body: {
//        "ConstituencyName": "Ipswich",
//        "ConstituencyID": "E14000761",
//        "ConstituencyType": "Borough",
//        "Electorate": 74499,
//        "ValidVotes": 48694,
//    }
//},function(err,resp,status) {
//    console.log(resp);
//});

//client.count({index: 'gov',type: 'constituencies'},function(err,resp,status) {
//    console.log("constituencies",resp);
//});



//client.search({
//    index: 'gov',
//    type: 'constituencies',
//    body: {
//        query: {
//            match: { "ConstituencyName": "Ipswich" }
//        },
//    }
//},function (error, response,status) {
//    if (error){
//        console.log("search error: "+error)
//    }
//    else {
//        console.log("--- Response ---");
//        console.log(response);
//        console.log("--- Hits ---");
//        response.hits.hits.forEach(function(hit){
//            console.log(hit);
//        })
//    }
//});

app.get('/checkuptime',(req,res) => {
   console.log("req.query.",req.query);
    //const tunnelingAgent = tunnel.httpsOverHttp({
    //    proxy: {
    //        host: 'localhost',
    //        port: 3000
    //    }
    //});
    const options = http.request({
        host: 'google.com',
        port: 443,
        //agent: tunnelingAgent
        //localAddress:"192.122.12.1"
    });

    console.log("options",options);
    http.get(options, function(res) {
        console.log(res);
        //res.pipe(process.stdout);
        res.send({"check":"check"});
    });
    //res.send({"check":"check"});
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});