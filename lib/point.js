const Vector3 = require("./vector3.js");

function Point(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

function Angle(inRad) {
    this.inRad = inRad;

    this.toDegrees = function() {
        return this.inRad * 180 / Math.PI;
    }
}

Point.distanceBetween = function(p1, p2) {
    // distance between two points P1 & P2 : sqrt((p1.x - p2.x)² + (p1.y - p2.y)² + (p1.z - p2.z)²)
    p1p2 = new Vector3(p1.x, p1.y, p1.z).sub(p2);
    const distanceP1P2 = Math.sqrt(Math.pow(p1p2.x, 2) + Math.pow(p1p2.y, 2) + Math.pow(p1p2.z, 2));
    return distanceP1P2;
};

Point.angleBetween = function(a, b, c) {
    if (!(a instanceof Object)) throw TypeError();
    if (!(b instanceof Object)) throw TypeError();
    if (!(c instanceof Object)) throw TypeError();

    /** calculate angle between 3 points
     * θ = arcos((|AB|² + |AC|² - |BC|²) / (2 * |AB| * |AC|))
     * where |AB| is length between points A and B
     */

    const distanceAB = Point.distanceBetween(a, b);
    const distanceABSquared = Math.pow(distanceAB, 2);
    
    const distanceAC = Point.distanceBetween(a, c);
    const distanceACSquared = Math.pow(distanceAC, 2);
    
    const distanceBC = Point.distanceBetween(b, c);
    const distanceBCSquared = Math.pow(distanceBC, 2);

    const k = (distanceABSquared + distanceACSquared - distanceBCSquared) / (2 * distanceAB * distanceAC);
    const theta = Math.acos(k);

    return new Angle(theta);
};

module.exports = Point;