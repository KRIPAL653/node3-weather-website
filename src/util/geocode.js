const request = require('request')
const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=23812eaa4504449525c8daee0a751c54&query=' + address;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect with weather service', undefined)
        }
        else if (body.error) {
            callback('unable to find location. try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location:body.data[0].label
            })
        }
    })
}

module.exports = geocode