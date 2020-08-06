/* Variables' declaration - START*/

// TODO checklist: There should be a primary object with placeholder member value pairs.
// trip details object
const details = {}

// TODO checklist: There should be URLS and API Keys for at least 3 APIs, including Geonames, Weatherbit, and Pixabay.
// API resources
const username = 'pavledis'
const geoNamesURL = 'http://api.geonames.org/searchJSON?q='
const weatherBitHistoryURL = 'https://api.weatherbit.io/v2.0/history/daily?lat='
const weatherBitForecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat='
const weatherBitKey = '4b9476c86c264765835350452acd68f0'
/* Variables' declaration - END*/

// TODO checklist: There should be a primary function that is exported to index.js
// function that handles all the data retrieved from external APIs (imported in app.js)
export const handleDataFromAPIs = (event) => {
    event.preventDefault() //Prevent default behaviour to stop page reload

    let departure = document.getElementById('departureCountry').value
    let destination = document.getElementById('destinationCountry').value

    // trip details' elements value retrieved from the DOM
    details['departure'] = document.getElementById('departureCountry').value
    details['destination'] = document.getElementById('destinationCountry').value
    details['departureDate'] = document.getElementById('travelDate').value
    details['daysRemaining'] = daysToGo(details['departureDate'])

    handleDataFromGeoNamesAPI(details['destination'])
        .then( (res) => {
            const latitude = res.geonames[0].lat
            const longitude = res.geonames[0].lng

            return handleDataFromWeatherBitAPI(latitude, longitude, details['departureDate'])
        })
        .then( (weatherData) => {
            // saving the weather details in the details object
            details['temperature'] = weatherData['data'][0]['temp']
            details['weather_condition'] = weatherData['data']['0']['weather']['description']

            //Call Pixabay API to fetch the first img of the city
        })
        // .then( () => {
        //     updateUI();
        // });
}

// get geo state info
const handleDataFromGeoNamesAPI = async (departure) => {

    // building the URL
    const result = await fetch(geoNamesURL + departure + '&maxRows=10&username=' + username)

    try{
        const data = await result.json()
        console.log(data)
        return data
    }
    catch (e) {
        console.log("error", e)
    }
}

// get weather data info
const handleDataFromWeatherBitAPI = async (lat, lng, travelingDate) => {

    const timestampTripDate = Math.floor(new Date(travelingDate).getTime() / 1000)
    const todayDate = new Date()
    const timestampTodayDate = Math.floor(new Date(todayDate.getFullYear() + '-'
        + todayDate.getMonth() + '-' + todayDate.getDate()).getTime() / 1000);

    let res;
    // if the user has chosen an earlier date than the current date
    if (timestampTripDate < timestampTodayDate) {
        let nextDate = new Date(travelingDate);
        nextDate.setDate(nextDate.getDate() + 1);
        res = await fetch(weatherBitHistoryURL + lat + '&lon=' + lng
            + '&start_date=' + travelingDate + '&end_date=' + nextDate + '&key=' + weatherBitKey)
    }
    else {
        res = await fetch(weatherBitForecastURL + lat + '&lon=' + lng +
            '&key=' + weatherBitKey);
    }

    try {
        const data = await res.json()
        console.log(data)
        return data;
    } catch (e) {
        console.log('error', e)
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

const daysToGo = (departureDate) => {
    const currentDate = new Date()
    const travellingDate = new Date(departureDate)

    const diff = Math.abs(travellingDate - currentDate)
    const diffInDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return diffInDays;
}
