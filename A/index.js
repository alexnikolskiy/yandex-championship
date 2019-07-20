"use strict";
module.exports = function (regions) {
    const geoObjectStack = [];
    const parents = new Map();
    const result = {};
    for (let region of regions) {
        geoObjectStack.push(region);
        while (geoObjectStack.length) {
            const geoObject = geoObjectStack.pop();
            const record = result[geoObject.id] = {};
            record.name = geoObject.name;
            if (parents.has(geoObject)) {
                record.parent = parents.get(geoObject);
            }
            if (geoObject.children) {
                record.children = geoObject.children.map(item => item.id);
                for (let children of geoObject.children) {
                    geoObjectStack.push(children);
                    parents.set(children, geoObject.id);
                }
            }
        }
    }
    return result;
};
