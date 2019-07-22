const assert = require('assert').strict;
const getCheapestTickets = require('./index');
import { Ticket } from './index';

let days: number[] = [1, 2, 4, 6, 7, 8, 9, 10, 20];
let tickets: Ticket[] = [
    { cost: 3, duration: 1 },
    { cost: 10, duration: 7 },
    { cost: 20, duration: 30 }
];
assert.deepEqual([0, 0, 1, 0], getCheapestTickets(days, tickets));

days = [1,2,3,4,8,9,10,11];
tickets = [
    { cost: 3, duration: 1 },
    { cost: 10, duration: 7 },
    { cost: 20, duration: 30 }
];
assert.deepEqual([2], getCheapestTickets(days, tickets));

days = [1,2,4,5,7,8];
tickets = [
    { cost: 3, duration: 1 },
    { cost: 5, duration: 2 },
    { cost: 7, duration: 3 }
];
assert.deepEqual([1, 1, 1], getCheapestTickets(days, tickets));

days = [1,3,25,50,100];
tickets = [
    { cost: 3, duration: 1 },
    { cost: 5, duration: 2 },
    { cost: 6, duration: 3 }
];
assert.deepEqual([2, 0, 0, 0], getCheapestTickets(days, tickets));

console.log('OK!');
