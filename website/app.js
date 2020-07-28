/* Global Variables - START*/
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//
// GET/POST requests to the open-weather-map Web API
//
// step 1: initialise base URL, key & other variables & functions to be used in the get request
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=00151dd27784e18e06bbe046aa86243d';
/* Global Variables - END*/

/*Functions - START*/
document.getElementById('generate').addEventListener('click', performAPIcalls);

function performAPIcalls() {
    let zipCode = document.getElementById('zip').value;

    getWeatherInfo(baseURL, zipCode, apiKey);
}

// step 2: get & post functions - async
const getWeatherInfo = async (baseURL, zipCode, apiKey) => {

    // building the URL
    const result = await fetch(baseURL + zipCode + apiKey);

    try{
        const data = await result.json();
        console.log(data);
        return data;
    }
    catch (e) {
        console.log("error", e);
    }
};
/*Functions - END*/
