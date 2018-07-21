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
        await currentprint(printQueue[0].name, printQueue[0].coords, printQueue[0].req, printQueue[0].res);
        await Helper.sleep(200);
        printQueue.splice(0, 1);
    }
    printing = false;
}

async function currentprint(name, coords, req, res) {
    let currentWeather = await WeatherAPI.getWeather(1, coords);
    let todaysForcast = await WeatherAPI.getWeather(2, coords);
    if (currentWeather == -1 || todaysForcast == -1) {
        res.end('400 BAD REQUEST: INVALID COORDINATES');
        return;
    }

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
                content: `${currentWeather}`,
                align: `left`,
                size: `small`
            },
            {
                content: `The forcast for today is ${todaysForcast}`,
                align: `left`,
                size: `small`
            }
        ]
    });
    await PythonShell.run('printer/write.py', text, async function (err, results) {
        if (err) {
            console.log('Could not open serial connection for ' + name + '\'s print');
            res.end('500 INTERNAL SERVER ERROR: PRINTER NOT RESPONDING');
        } else {
            res.end('200 OK');
        }
    });
}