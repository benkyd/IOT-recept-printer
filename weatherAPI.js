const request = require('snekfetch');
const fs = require('fs');

let weatherAPI = fs.readFileSync('api.txt');

module.exports.getWeather = async function(mode, coords) {
    let res;
    try {
        let req = request.get(`https://api.darksky.net/forecast/${weatherAPI}/${coords}`);
        req.query('units', 'si');
        res = await req.send();
    } catch (e) {  }

    if (mode == 1) {
        return res.body.currently.summary;
    } else if (mode == 2) {
        return res.body.hourly.summary;
    }
}
