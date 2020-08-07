/* Variables' declaration - START*/

// TODO checklist: There should be a primary object with placeholder member value pairs.
// trip details object
const details = {}

// TODO checklist: There should be URLS and API Keys for at least 3 APIs, including Geonames, Weatherbit, and Pixabay.

// API resources //
const username = 'pavledis'
const geoNamesURL = 'http://api.geonames.org/searchJSON?q='
const weatherBitHistoryURL = 'https://api.weatherbit.io/v2.0/history/daily?lat='
const weatherBitForecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat='
const weatherBitKey = '4b9476c86c264765835350452acd68f0'
const pixabayURL = 'https://pixabay.com/api/?key='
const pixabayKey = '17792111-34a6c3c8acad53991e079f486'
/* Variables' declaration - END*/

// Primary Function //

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

    try {
        handleDataFromGeoNamesAPI(details['destination'])
            .then((res) => {
                const latitude = res.geonames[0].lat
                const longitude = res.geonames[0].lng

                return handleDataFromWeatherBitAPI(latitude, longitude, details['departureDate'])
            })
            .then((weatherData) => {
                // saving the weather details in the details object
                details['temperature'] = weatherData['data'][0]['temp']
                details['weather_condition'] = weatherData['data']['0']['weather']['description']

                //Call Pixabay API to fetch the first img of the city
                return handleDataFromPixabayAPI(details['destination'])
            })
            .then((imageDetails) => {
                if (imageDetails['hits'].length > 0) {
                    details['cityImage'] = imageDetails['hits'][0]['webformatURL'];
                }
                // Send all data 'details' object to the server to be store
                return postData(details);
            })
            .then((data) => {
                console.log("last data: " + data)
                //Receiving the data from server and updating the UI
                return updateUI(data);
            })
    }
    catch (e) {
        console.log('error: ', e);
    }
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

const handleDataFromPixabayAPI = async (destinationCountry) => {
    const res = await fetch(pixabayURL + pixabayKey + '&q=' + destinationCountry
        + ' city&image_type=photo');
    try {
        const data = await res.json();
        return data
    } catch (e) {
        console.log('error', e);
    }
}

// post function
const postData = async (data) => {
    const res = await fetch('/postTripData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try {
        const newDataInfo = await res.json()
        console.log("new data info: " + newDataInfo)
        return newDataInfo
    }
    catch (e) {
        console.log("error message: " + e)
    }
}

// update the UI
const updateUI = async (data) => {
    try {
        document.getElementById('tripDetails').classList.remove('invisible');
        document.getElementById('departure').innerHTML = data.departure;
        document.getElementById('destination').innerHTML = data.destination;
        document.getElementById('departureDate').innerHTML = data.departureDate;
        document.getElementById('weather_condition').innerHTML = data.weather_condition;
        document.getElementById('cityImage').innerHTML = data.cityImage;

        if (data.daysRemaining < 0) {
            document.getElementById('daysRemaining').innerHTML = 'Seems like you have already been to the trip! ' +
                'or you have put a wrong date';
        } else {
            document.getElementById('daysRemaining').innerHTML = data.daysRemaining;
        }
        document.getElementById('temperature').innerHTML = data.temperature + '&#8451;';
        if (data.cityImage !== undefined) {
            document.getElementById('cityImage').setAttribute('src', data.cityImage);
        }
    }
    catch (e) {
        console.log("error message: " + e);
    }
}

const daysToGo = (departureDate) => {
    const currentDate = new Date()
    const travellingDate = new Date(departureDate)

    // const diff = Math.abs(travellingDate - currentDate)
    const diffInDays = Math.ceil((travellingDate - currentDate) / (1000 * 60 * 60 * 24));

    return diffInDays;
}
