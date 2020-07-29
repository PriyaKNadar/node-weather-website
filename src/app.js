const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(__filename)

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join('__dirname','../templates/partials')

//setup handle bars engine and view loaction
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req,res) => {
//     //res.send('Hello Express!')
//     res.send('<h1> Hello </h1>') 
// })

// app.get('/help', (req,res) => {
//     //res.send('Help page')
//     res.send({
//         name: 'Priya',
//         age: 35
//     })
// })

// app.get('/about', (req,res) => {
//     res.send('About page')
// })

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Priya Nadar'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Priya Nadar'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        helpText: 'This page is helpful',
        title: 'Help',
        name: 'Priya Nadar'
    })
})



app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address term"
        })
    }

    geocode(req.query.address,(error, { latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // console.log(req.query.address)
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Boston',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: "404",
        name: "Priya Nadar",
        errorMessage: "Help article not found"
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: "404",
        name: "Priya Nadar",
        errorMessage: "Page not found"
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up!')
})