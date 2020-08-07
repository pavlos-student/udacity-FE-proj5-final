// ?? import img from './{file}.png';  // The file-loader resolves import/require() on a file into a url and emits the file into the output directory
                                    // This will emit file.png as a file in the output directory and returns the public URI of the file.

// ?? import html from './file.html'; // Exports HTML as string. HTML is minimized when the compiler demands.

// TODO checklist: remove - (styles referenced in html/css)
import './styles/style.scss'

// TODO checklist: remove - At least one function should be imported.
import {handleDataFromAPIs} from "./js/performAction";

// TODO checklist: remove - At least one event listener should be imported.
// import event listeners declared in the app.js (the latter will declare the events & expose them)
import {onFormSubmitPerformAction} from "./js/app";

export {handleDataFromAPIs, onFormSubmitPerformAction}
