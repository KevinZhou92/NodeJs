const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
    address:{
      demand: true,
      alias: 'a',
      describe:'Address to fetch weather for',
      string:true,
    }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encondedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encondedAddress}`;
axios.get(geocodeUrl)
    .then(function (response) {
        if (response.data.status === 'ZERO_RESULTS') {
          throw new Error('Unable to finde that address!');
        }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/b2cfa13bfbbe0ddb0df58a9e5bf84fca/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    }).then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently: ${temperature}. It feels like ${apparentTemperature}`);
    })
    .catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('Unable to connect API servers!');
        } else {
            console.log(error.message);
        }
    });
