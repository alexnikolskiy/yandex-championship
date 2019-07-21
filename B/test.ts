const assert = require('assert').strict;
const search = require('./index');
import { FetchFlights, Route } from './index';

const fetchFlights: FetchFlights = (node) => {
    let result: string[];

    switch (node) {
        case 'A':
            result = ['B', 'C'];
            break;
        case 'B':
            result = ['D', 'E'];
            break;
        case 'C':
            result = ['F'];
            break;
        case 'D':
            result = ['G'];
            break;
        case 'G':
            result = ['H'];
            break;
        default:
            result = [];
    }

    return Promise.resolve(result);
};

(async () => {
    let route: Route;

    route = await search('A', 'F', fetchFlights);
    assert.deepEqual(['A', 'C', 'F'], route);

    route = await search('A', 'X', fetchFlights);
    assert.equal('no way', route);

    console.log('OK!');
})();
