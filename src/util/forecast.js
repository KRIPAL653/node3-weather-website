const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c6b0947561f7e56fcac6a010824829f5&query=' + lat + ',' + long + '';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect with weather service', undefined);
        } else if (body.error) {
            callback("unable to find location. try another search", undefined);
        }
        else {
            const dataCurrent = body.current;
            callback(undefined, dataCurrent.weather_descriptions[0] + ', it is currently ' + dataCurrent.temperature + ' degrees out. there is a ' + dataCurrent.precip + '% chance of rain. humidity is ' + dataCurrent.humidity + '%. it feels like '+dataCurrent.feelslike+'%')
        }
    })
}

module.exports = forecast