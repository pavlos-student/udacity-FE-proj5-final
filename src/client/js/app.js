import {handleDataFromAPIs} from "./performAction";
// TODO reminder: export the function so that the index.js can import it

/* Event listeners - START */

// perform api calls as the end-user clicks on the Submit button 'submitForm'
export const onFormSubmitPerformAction = document.getElementById('submitForm')
    .addEventListener('click', handleDataFromAPIs)

/* Event listeners - END */
