export type FetchFlights = (departurePoint: string) => Promise<string[]>;
export type Route = string[] | string;

module.exports = function (start: string, end: string, fetchFlights: FetchFlights): Promise<Route> {
    const parents: {
        [key: string]: string
    } = {};
    const queue: string[] = [];

    parents[start] = '';
    queue.push(start);

    function search(): Promise<boolean> {
        if (queue.length === 0) {
            return Promise.resolve(false);
        }

        const point: string = queue.shift() as string;

        if (point === end) {
            return Promise.resolve(true);
        }

        return fetchFlights(point).then((points: string[]): Promise<boolean> => {
            for (let p of points) {
                parents[p] = point;
                queue.push(p);
            }

            return search();
        });
    }

    // @ts-ignore
    return search().then((hasFlight: boolean) => {
        if (!hasFlight) {
            return Promise.resolve('no way');
        }

        let result: string[] = [];
        let parent: string = parents[end];

        result.push(end);

        while (parent) {
            result.push(parent);
            parent = parents[parent];
        }

        return Promise.resolve(result.reverse());
    });
};
