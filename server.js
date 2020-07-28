// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});

/* HTTP Routes - START */
// GET
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log('this response was sent: ' + projectData);
});

// POST
app.post('/add', (req, res) => {
    console.log('Coming Request: ' + req.body);
    let newInfoObj = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    projectData = newInfoObj;
    console.log("new info: " + projectData);
    res.send(projectData);
});
/* HTTP Routes - END */
