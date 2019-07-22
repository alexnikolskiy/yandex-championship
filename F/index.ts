export interface Ticket {
    cost: number;
    duration: number;
}

module.exports = function (days: number[], tickets: Ticket[]): number[] {
    const maxDay: number = days.length ? days[days.length - 1] : 0;
    const minSum: number[] = new Array(maxDay + 1);
    const daysSet: Set<number> = new Set(days);
    const prev: number[] = new Array(maxDay + 1);
    const result: number[] = [];

    minSum[0] = 0;
    minSum.fill(Number.POSITIVE_INFINITY, 1);
    prev.fill(-1, 0);

    const sortedTickets: Ticket[] = tickets
        .slice()
        .sort((a: Ticket, b: Ticket) => a.cost / a.duration - b.cost / b.duration);

    for (let i = 1; i < minSum.length; i++) {
        if (!daysSet.has(i)) {
            minSum[i] = minSum[i - 1];
            prev[i] = i - 1;
            continue;
        }

        for (let j = 0; j < sortedTickets.length; j++) {
            const { cost, duration }: { cost: number, duration: number} = sortedTickets[j];
            let prevCost: number = 0;
            let prevMin: number = minSum[i];

            if (i >= duration) {
                prevCost = minSum[i - duration];
            }

            minSum[i] = Math.min(minSum[i], cost + prevCost);

            if (prevMin !== minSum[i]) {
                prev[i] = i >= duration ? i - duration : 0;
            }
        }
    }

    let last: number = minSum[minSum.length - 1];
    let next: number = prev[prev.length - 1];

    while (next >= 0) {
        let curr: number = minSum[next];

        if ((last === curr || !daysSet.has(next)) && next !== 0) {
            next = prev[next];
            continue;
        }

        let cost: number = last - curr;
        let ticketIndex: number = tickets.findIndex(ticket => ticket.cost === cost);

        result.push(ticketIndex);

        last = curr;
        next = prev[next];
    }

    return result.reverse();
};
