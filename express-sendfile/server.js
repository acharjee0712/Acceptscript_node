const express = require('express');
const app = express();
const path = require('path')
const https = require("https"),
fs = require("fs");
var http = require('http');
var sslOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    passphrase: '0712'
};

app.get('/index_all.html',(req,resp) => {
    resp.sendFile(path.join(__dirname,'index_all.html'));
    console.log("")

});
app.use(express.static('./'));
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});  

https.createServer(sslOptions,app).listen(1482, () => {
    console.log('server started in 1482');
});