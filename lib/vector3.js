function Vector3(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    this.add = function(v) {
        if (v instanceof Object)    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
        else                        throw new TypeError();
    };
    this.sub = function(v) {
        if (v instanceof Object)    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
        else                        throw new TypeError();
    };
    this.multiply = function(v) {
        if (v instanceof Object)    return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
        else                        throw new TypeError();
    };
    this.dotProduct = function(v) {
        if (!(v instanceof Object)) throw new TypeError();
        return this.x * v.x + this.y * v.y + this.z * v.z;
    };
    this.dot = function(v) {
        if (v instanceof Object)    return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
        else                        throw new TypeError();
    };
    this.crossProduct = function(v) {
        const x = this.y * v.z - this.z * v.y
            , y = this.z * v.x - this.x * v.z
            , z = this.x * v.y - this.y * v.x;
        if (v instanceof Object)    return new Vector3(x, y, z);
        else                        throw new TypeError();
    };
    this.norm = function() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    };
    this.normalize = function() {
        const norm = this.norm();
        return new Vector3(this.x / norm, this.y / norm, this.z / norm);
    };
}

Vector3.fromObject = function(o) {
    return new Vector3(o.x, o.y, o.z);
}

Vector3.angleBetween = function(v1, v2) {
    if (!(v1 instanceof Object)) throw TypeError();
    if (!(v2 instanceof Object)) throw TypeError();
    v1 = Vector3.fromObject(v1);
    v2 = Vector3.fromObject(v2);
    
    let dotProduct = v1.dotProduct(v2);

    let v1Norm = v1.norm();
    let v2Norm = v2.norm();

    let cosTheta = dotProduct / (v1Norm * v2Norm);
    let theta = Math.acos(cosTheta);

    return new Angle(theta);
}

function Angle(inRad) {
    this.inRad = inRad;

    this.toDegrees = function() {
        return this.inRad * 180 / Math.PI;
    }
}

module.exports = Vector3;