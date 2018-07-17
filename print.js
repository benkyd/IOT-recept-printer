const PythonShell = require('python-shell');
const Result = require('./resultbuilder'); 
const WeatherAPI = require('./weatherAPI');

module.exports.print = async function(name, coords) {
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
    PythonShell.run('printer/write.py', text, function (err, results) {
        if (err) throw err;
    });
}