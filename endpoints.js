const bodyParser = require('body-parser');
const express = require('express');
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

app.get('/print', function (req, res) {
    let name = req.query.name;
    let coords = req.query.coords;

    console.log(name, coords);

    Printer.print(name, coords);
});
