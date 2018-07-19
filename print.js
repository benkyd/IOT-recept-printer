const PythonShell = require('python-shell');
const WeatherAPI = require('./weatherAPI');
const Result = require('./resultbuilder'); 
const Helper = require('./helper');

let printQueue = [];
let printing = false;

module.exports.getprintqueue = function() {
    return printQueue;
}

module.exports.setprintqueue = function(tmp) {
    printQueue = tmp;
}

module.exports.printing = function() {
    return printing;
}

module.exports.print = async function() {
    printing = true;
    while (printQueue.length > 0) {
        await currentprint(printQueue[0].name, printQueue[0].coords);
        await Helper.sleep(200);
        printQueue.splice(0, 1);
    }
    printing = false;
}

async function currentprint(name, coords) {
    let text = Result.genCompilerSettings({
        padding: 2,
        lineBreaks: 1,
        lines: [
            {
                content: `Hello, ${name}!`,
                align: `center`,
                size: `large`
            },
            {
                content: `The weather at ${coords} is:`,
                align: `left`,
                size: `small`
            },
            {
                content: `${await WeatherAPI.getWeather(1, coords)}`,
                align: `left`,
                size: `small`
            },
            {
                content: `The forcast for today is ${await WeatherAPI.getWeather(2, coords)}`,
                align: `left`,
                size: `small`
            }
        ]
    });
    try {
        await PythonShell.run('printer/write.py', text, function (err, results) {
            if (err) {
                console.log('Could not open serial connection for ' + name + '\'s print');
            }
        });
    } catch (err) {}
}