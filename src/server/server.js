// Setup empty JS object to act as endpoint for all routes
const projectData = {}

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// TODO: prod - uncomment the 'dist' folder
// Initialize the main project folder
// app.use(express.static('src/client'))
app.use(express.static('dist'))

// TODO: prod (change to 8000)
// Setup Server
const port = 8000;
const server = app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
});

/* HTTP Routes - START */

// TODO: prod - uncomment the dist/index.html
// webpack outputs to the 'dist' folder
app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/postTripData', (req, res) => {
    projectData['destination'] = req.body.destination
    projectData['departure'] = req.body.departure;
    projectData['temperature'] = req.body.temperature;
    projectData['weather_condition'] = req.body.weather_condition;
    projectData['daysRemaining'] = req.body.daysRemaining;
    projectData['cityImage']  = req.body.cityImage;
    projectData['departureDate'] = req.body.departureDate;
    res.send(projectData);
})

// GET
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log('this response was sent: ' + projectData);
});
/* HTTP Routes - END */

// module.exports = app
