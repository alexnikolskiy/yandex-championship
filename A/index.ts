type GeoId = number;

interface GeoObject {
    id: number;
    name: string;
    children?: GeoObject[]
}

type Regions = GeoObject[];

interface GeoRecord {
    name: string;
    parent?: GeoId;
    children?: GeoId[];
}

interface Geobase {
    [key: number]: GeoRecord;
}

module.exports = function (regions: Regions) {
    const geoObjectStack: GeoObject[] = [];
    const parents: Map<GeoObject, number> = new Map();
    const result: Geobase = {};

    for (let region of regions) {
        geoObjectStack.push(region);

        while (geoObjectStack.length) {
            const geoObject = geoObjectStack.pop();
            // const record = result[geoObject.id] = { name: geoObject.name };
            const record: GeoRecord = { name: geoObject.name };

            // record.name = geoObject.name;

            if (parents.has(geoObject)) {
                record.parent = parents.get(geoObject);
            }

            if (geoObject.children) {
                record.children = geoObject.children.map(item => item.id);

                for (let child of geoObject.children) {
                    geoObjectStack.push(child);
                    parents.set(child, geoObject.id);
                }
            }

            result[geoObject.id] = record;
        }
    }

    return result;
};
