const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
            .option('address',
            {
                alias: 'a',
                demandOption: true,
                default: '151 Thorn Ln, Newark, DE 19711',
                describe: 'The address',
                type: 'string'
            })
            .help()
            .argv;

var encodedAddress = encodeURIComponent(argv.address);
var encodedAddressUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
axios.get(encodedAddressUrl).then((response) => {
    if (response.data.status === 'ZERO_RESUlTS') {
        throw new Error('Unable to find the address!');
    }
    console.log('Kevin\'s WeatherApp');
    console.log('===================');
    console.log('Location:', response.data.results[0].formatted_address);
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/b2cfa13bfbbe0ddb0df58a9e5bf84fca/${lat},${lng}`;
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var hourlySummary = response.data.hourly.summary;
    console.log(`Weather: It's ${temperature} now. It feels like ${apparentTemperature}.`);
    console.log(`Forecast: ${hourlySummary}`);
})
.catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API server!');
    } else {
        console.log(error.message);
    }
})
