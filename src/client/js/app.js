import {handleDataFromAPIs} from "./performAction";

// perform api calls as the end-user clicks on the Submit button 'submitForm'
export const onFormSubmitPerformAction = document.getElementById('submitForm')
    .addEventListener('click', handleDataFromAPIs)
