import {handleDataFromAPIs} from "./performAction";

// perform api calls as the end-user clicks on the Submit button 'submitForm'
export const onFormSubmitPerformAction = document.getElementById('submitForm')
    .addEventListener('click', handleDataFromAPIs)

export const onRemoveTrip = document.getElementById('removeTrip')
    .addEventListener('click', () => {
        document.getElementById('formDetails').reset()
        document.getElementById('tripDetails').classList.add("invisible")
        location.reload()
    })
