const Vector3 = require("./vector3.js");

function Point(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    this.fromObject = function(o) {
        return new Point(o.x, o.y, o.z);
    };
}

function Angle(inRad) {
    this.inRad = inRad;

    this.toDegrees = function() {
        return this.inRad * 180 / Math.PI;
    }
}

Point.lengthBetween = function(p1, p2) {
    // length between two points P1 & P2 : sqrt((p1.x - p2.x)² + (p1.y - p2.y)² + (p1.z - p2.z)²)
    p1p2 = new Vector3(p1.x, p1.y, p1.z).sub(p2);
    let lengthP1P2 = Math.sqrt(Math.pow(p1p2.x, 2) + Math.pow(p1p2.y, 2) + Math.pow(p1p2.z, 2));
    return lengthP1P2;
};

Point.angleBetween = function(a, b, c) {
    if (!(a instanceof Object)) throw TypeError();
    if (!(b instanceof Object)) throw TypeError();
    if (!(c instanceof Object)) throw TypeError();

    /** calculate angle between 3 points
     * θ = arcos((|AB|² + |AC|² - |BC|²) / (2 * |AB| * |AC|))
     * where |AB| is length between points A and B
     */

    const lengthAB = Point.lengthBetween(a, b);
    const lengthABSquared = Math.pow(lengthAB, 2);
    
    const lengthAC = Point.lengthBetween(a, c);
    const lengthACSquared = Math.pow(lengthAC, 2);
    
    const lengthBC = Point.lengthBetween(b, c);
    const lengthBCSquared = Math.pow(lengthBC, 2);

    let k = (lengthABSquared + lengthACSquared - lengthBCSquared) / (2 * lengthAB * lengthAC);
    let theta = Math.acos(k);

    return new Angle(theta);
};

module.exports = Point;