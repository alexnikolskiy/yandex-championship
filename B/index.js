module.exports = function (start, end, fetchFlights) {
    const parents = {};
    const queue = [];

    parents[start] = null;
    queue.push(start);

    function search() {
        if (queue.length === 0) {
            return Promise.resolve(false);
        }

        const point = queue.shift();

        if (point === end) {
            return Promise.resolve(true);
        }

        return fetchFlights(point).then(points => {
            for (let p of points) {
                parents[p] = point;
                queue.push(p);
            }

            return search();
        });
    }

    return search().then(hasFlight => {
        if (!hasFlight) {
            return Promise.resolve('no way');
        }

        let result = [];
        let parent = parents[end];

        result.push(end);

        while (parent) {
            result.push(parent);
            parent = parents[parent];
        }

        return Promise.resolve(result.reverse());
    });
};
