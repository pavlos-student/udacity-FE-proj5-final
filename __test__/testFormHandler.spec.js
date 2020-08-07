//Import the js file to test
import {handleDataFromAPIs} from "../src/client/js/performAction"

describe('Testing handleSubmit function', () => {
    test('It should return true because the handleDataFromAPIs is defined', async () => {
        expect(handleDataFromAPIs).toBeDefined();
    });
    test('It should return true as handleDataFromAPIs is a function', async () => {
        expect(typeof handleDataFromAPIs).toBe('function');
    });
});
