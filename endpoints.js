const bodyParser = require('body-parser');
const express = require('express');
const Helper = require('./helper');
const fs = require('fs');

const Printer = require('./print');
let app = express();

let port = 8080;

module.exports.listen = function() {
    app.listen(port);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./client'))

app.get('/', function (req, res) {
    res.sendFile( __dirname + '/client');
}); 

app.get('/print', async function (req, res) {
    let rate = await rateLimit(req, res);
    if (rate == -1) return;

    let inname = req.query.name;
    let incoords = req.query.coords;
    console.log('New print request for ', inname, ' at ', incoords);
    
    let set = Printer.getprintqueue();
    set.push({
        name: inname, 
        coords: incoords,
        req: req,
        res: res
    });
    Printer.setprintqueue(set);
    if (!Printer.printing()) Printer.print();
});

let requests = [];
async function rateLimit(req, res) {
    if (requests.indexOf(req.connection.remoteAddress) != -1) {
        res.end('429 TO MANY REQUESTS');
        await Helper.sleep('3000');
    
        while (requests.indexOf(req.connection.remoteAddress) != -1) {
            requests.splice(requests.indexOf(req.connection.remoteAddress), 1);
        }
        return -1;
    }
    requests.push(req.connection.remoteAddress);
}
