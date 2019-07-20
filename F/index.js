module.exports = function (days, tickets) {
    const maxDay = days.length ? days[days.length - 1] : 0;
    const minSum = new Array(maxDay + 1);
    const daysSet = new Set(days);
    const prev = new Array(maxDay + 1);
    const result = [];

    minSum[0] = 0;
    minSum.fill(Number.POSITIVE_INFINITY, 1);
    prev.fill(-1, 0);

    const sortedTickets = tickets.slice().sort((a, b) => a.cost / a.duration - b.cost / b.duration);

    for (let i = 1; i < minSum.length; i++) {
        if (!daysSet.has(i)) {
            minSum[i] = minSum[i - 1];
            prev[i] = i - 1;
            continue;
        }

        for (let j = 0; j < sortedTickets.length; j++) {
            const { cost, duration } = sortedTickets[j];
            let prevCost = 0;
            let prevMin = minSum[i];

            if (i >= duration) {
                prevCost = minSum[i - duration];
            }

            minSum[i] = Math.min(minSum[i], cost + prevCost);

            if (prevMin !== minSum[i]) {
                prev[i] = i >= duration ? i - duration : 0;
            }
        }
    }

    let last = minSum[minSum.length - 1];
    let next = prev[prev.length - 1];

    while (next >= 0) {
        let curr = minSum[next];

        if ((last === curr || !daysSet.has(next)) && next !== 0) {
            next = prev[next];
            continue;
        }

        let cost = last - curr;
        let ticketIndex = tickets.findIndex(ticket => ticket.cost === cost);

        result.push(ticketIndex);

        last = curr;
        next = prev[next];
    }

    return result.reverse();
};
