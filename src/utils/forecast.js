const request = require('request')

const forecast = (latitude, longitude   , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b0190f258f70762a634598b66a5d9f4f&query=' + latitude + ',' + longitude + '&units=f'

    request ({url, json: true}, (error, { body }) => {
        if(error) {

            callback('Unable to connect to weather services!', undefined)
        } else if (body.error == 0) {
            callback('Unable to find location. ', undefined)
        } 
        else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out but it feels like ' + body.current.feelslike + ' degrees. The humidity is ' + body.current.humidity + '%.')
        
            //console.log(response.body.current.weather_descriptions[0] + " It is currently " + response.body.current.temperature + " degrees out but it feels like " + response.body.current.feelslike + " degrees")
        }
    })
}

module.exports = forecast