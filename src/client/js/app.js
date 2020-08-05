// export the function so the index.js can import it


// /* Global Variables - START*/
// // Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//
// //
// // GET/POST requests to the open-weather-map Web API
// //
// // step 1: initialise base URL, key & other variables & functions to be used in the get request
// let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// const apiKey = '&appid=00151dd27784e18e06bbe046aa86243d';
// /* Global Variables - END*/
//
// /*Functions - START*/
// // perform api calls as the end-user clicks on the 'Generate' button
// document.getElementById('generate').addEventListener('click', performAPIcalls);
//
// function performAPIcalls() {
//     let zipCode = document.getElementById('zip').value;
//     let feeling = document.getElementById('feelings').value;
//
//     getWeatherInfo(baseURL, zipCode, apiKey)
//         .then( (data) => {
//             console.log("retrieved data: " + data);
//             let temp = data.main.temp;
//             postData('/add', {
//                 date: newDate,
//                 temp: temp,
//                 content: feeling
//             });
//         })
//         .then( () => {
//             updateUI();
//         });
// }
//
// // step 2: get & post functions - async
// // get function
// const getWeatherInfo = async (baseURL, zipCode, apiKey) => {
//
//     // building the URL
//     const result = await fetch(baseURL + zipCode + apiKey);
//
//     try{
//         const data = await result.json();
//         console.log(data);
//         return data;
//     }
//     catch (e) {
//         console.log("error", e);
//     }
// };
//
// // post function
// const postData = async (url = '', data ={}) => {
//     console.log("retrieved data 'app.js file': " + data);
//
//     const res = await fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     });
//
//     try {
//         const newDataInfo = await res.json();
//         console.log("new data info 'app.js': " + newDataInfo);
//         return newDataInfo;
//     }
//     catch (e) {
//         console.log("error message: " + e);
//     }
// };
//
// // update the UI
// const updateUI = async () => {
//     const getAllData = await fetch('/all');
//     try {
//         const retrievedData = await getAllData.json()
//         document.getElementById('temp').innerHTML = retrievedData.temp;
//         document.getElementById('content').innerHTML = retrievedData.content;
//         document.getElementById('date').innerHTML = retrievedData.date;
//     }
//     catch (e) {
//         console.log("error message: " + e);
//     }
// };
// /*Functions - END*/
