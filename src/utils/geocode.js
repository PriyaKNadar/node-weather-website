const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=b0190f258f70762a634598b66a5d9f4f&query=37.8267,-122.4233&units=f'

// request ({ url: url, json: true}, (error, response) => {
//     //const data = JSON.parse(response.body.current)
//     //console.log(data.current)
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to fnd location')
//     }    
//     else {
//         console.log(response.body.current.weather_descriptions[0] + " It is currently " + response.body.current.temperature + " degrees out but it feels like " + response.body.current.feelslike + " degrees")
//     }
// })

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicHJpeWFrYWxhaXNlbHZhbiIsImEiOiJja2NramJ2ZHEwYmVsMnp0ODgwZ3Y3OWFrIn0.gAYy_sa52ppT9d9lvirwVA&limit=1'

// request({url: geocodeURL, json: true }, (error, response) => {

//     if (error) {
//         console.log('Unable to connect to location services')
//     } else if (response.body.features.length == 0) {
//         console.log('Unable to find location. Try another search')
//     }    
//     else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude, longitude)
//     }
// })

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJpeWFrYWxhaXNlbHZhbiIsImEiOiJja2NramJ2ZHEwYmVsMnp0ODgwZ3Y3OWFrIn0.gAYy_sa52ppT9d9lvirwVA&limit=1'

    request ({url, json: true}, (error, { body }) => {
        if(error) {

            callback('Unable to connect to loation services!', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode