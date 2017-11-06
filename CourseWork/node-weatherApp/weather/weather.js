const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/b2cfa13bfbbe0ddb0df58a9e5bf84fca/${latitude},${longitude}`,
        json:true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                Temperature: body.currently.temperature,
                ApparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to to connect to forecast weather.');
        }
    });
};

module.exports.getWeather = getWeather;
