const request = require('request');

var geocodeAddress = (address, callback) => {
    var encondedAddress = encodeURIComponent(address);
    request({
            url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encondedAddress}`,
            json:true
        },
        (error, response, body) => {
        if (response.statusCode === 200) {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        } else if (response.status == 'ZERO_RESULTS') {
            callback('Unable to find that address')
        } else {
            callback('Unabel to connect to google servers!')
        }
    });
};

module.exports = {
    geocodeAddress
}
