const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

// callback fucntion was used in geocodeAddress() and once geocodeAddress() finishes it will call this function to fulfill the job
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        // JSON.stringify(data, filter, indentation)
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${weatherResults.Temperature}. It feels like ${weatherResults.ApparentTemperature}.`);
            }
        });
    }
});
