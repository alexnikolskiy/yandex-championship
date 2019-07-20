const assert = require('assert').strict;
const search = require('./index');

const fetchFlights = (node) => {
    let result;

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

console.time('test');
search("A", "F", fetchFlights).then(res => {
    assert.deepEqual(['A', 'C', 'F'], res);
    console.log('OK!')
});
