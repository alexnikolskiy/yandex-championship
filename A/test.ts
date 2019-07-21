const assert = require('assert').strict;
const hash = require('./index');

const regions = [
    {
        id: 9527, name: 'Россия',
        children: [
            {
                id: 95134,
                name: 'Приморский край',
                children: [
                    { id: 9529, name: 'Владивосток' },
                    { id: 90163, name: 'Артем' }
                ]
            },
            { id: 78274, name: 'Москва' },
        ]
    }
];
const record = {
    '9527': { name: 'Россия', children: [95134, 78274] },
    '9529': { name: 'Владивосток', parent: 95134 },
    '78274': { name: 'Москва', parent: 9527 },
    '90163': { name: 'Артем', parent: 95134 },
    '95134': { name: 'Приморский край', parent: 9527, children: [9529, 90163] }
};

assert.deepEqual(record, hash(regions));

console.log('OK!');
