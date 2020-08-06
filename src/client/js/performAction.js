/* Variables' declaration - START*/

// TODO checklist: There should be a primary object with placeholder member value pairs.
// trip details object
const details = {};

// API resources
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const geoNamesUsername = 'pavledis';
/* Variables' declaration - END*/

// function that handles all the data retrieved from external APIs (imported in app.js)
export const handleDataFromAPIs = (event) => {
    event.preventDefault(); //Prevent default behaviour to stop page reload

    let departure = document.getElementById('departureCountry').value;
    let destination = document.getElementById('destinationCountry').value;

    // trip details' elements value retrieved from the DOM
    details['departure'] = document.getElementById('departureCountry').value;
    details['destination'] = document.getElementById('destinationCountry').value;
    details['departureDate'] = document.getElementById('travelDate').value;

    handleDataFromGeoNamesAPI(details['departure'])
        .then( (res) => {
            const latitude = res.geonames[0].lat;
            const longitude = res.geonames[0].lng;

            console.log("lat: " + latitude)
            console.log("lng: " + longitude)
            // postData('/add', {
            //     date: ,
            //     temp: ,
            //     content:
            // });
        })
        // .then( () => {
        //     updateUI();
        // });
}

// get geo state info
const handleDataFromGeoNamesAPI = async (departure) => {

    // building the URL
    const result = await fetch(geoNamesURL + departure + '&maxRows=10&username=' + geoNamesUsername);

    try{
        const data = await result.json();
        console.log(data);
        return data;
    }
    catch (e) {
        console.log("error", e);
    }
}

// post function
const postData = async (url = '', data ={}) => {
    console.log("retrieved data 'app.js file': " + data);

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newDataInfo = await res.json();
        console.log("new data info 'app.js': " + newDataInfo);
        return newDataInfo;
    }
    catch (e) {
        console.log("error message: " + e);
    }
}

// update the UI
const updateUI = async () => {
    const getAllData = await fetch('/all');
    try {
        const retrievedData = await getAllData.json()
        document.getElementById('temp').innerHTML = retrievedData.temp;
        document.getElementById('content').innerHTML = retrievedData.content;
        document.getElementById('date').innerHTML = retrievedData.date;
    }
    catch (e) {
        console.log("error message: " + e);
    }
}

// const performAction = (event) => {
//     event.preventDefault(); //Prevent default behaviour to stop page reload
// }
