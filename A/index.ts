type GeoId = number;

export interface GeoObject {
    id: number;
    name: string;
    children?: GeoObject[];
}

type Regions = GeoObject[];

interface GeoRecord {
    name: string;
    parent?: GeoId;
    children?: GeoId[];
}

export interface Geobase {
    [key: number]: GeoRecord;
}

module.exports = function (regions: Regions) {
    const geoObjectStack: GeoObject[] = [];
    const parents: Map<GeoObject, GeoId> = new Map();
    const result: Geobase = {};

    for (let region of regions) {
        geoObjectStack.push(region);

        while (geoObjectStack.length) {
            const geoObject: GeoObject = geoObjectStack.pop() as GeoObject;
            const record: GeoRecord = { name: geoObject.name };

            if (parents.has(geoObject)) {
                record.parent = parents.get(geoObject);
            }

            if (geoObject.children) {
                record.children = [];

                for (let child of geoObject.children) {
                    geoObjectStack.push(child);
                    record.children.push(child.id);
                    parents.set(child, geoObject.id);
                }
            }

            result[geoObject.id] = record;
        }
    }

    return result;
};
