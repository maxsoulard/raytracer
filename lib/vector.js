function Vector(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    this.add = function(v) {
        if (v instanceof Object)    return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
        else                        throw new TypeError();
    };
    this.sub = function(v) {
        if (v instanceof Object)    return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
        else                        throw new TypeError();
    };
    this.multiply = function(v) {
        if (v instanceof Object)    return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
        else                        throw new TypeError();
    };
    this.dotProduct = function(v) {
        if (v instanceof Object)    return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
        else                        throw new TypeError();
    };
    this.crossProduct = function(v) {
        const x = this.y * v.z - this.z * v.y
            , y = this.z * v.x - this.x * v.z
            , z = this.x * v.y - this.y * v.x;
        if (v instanceof Object)    return new Vector(x, y, z);
        else                        throw new TypeError();
    };
    this.norm = function() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    };
    this.normalize = function() {
        const norm = this.norm();
        return new Vector(this.x / norm, this.y / norm, this.z / norm);
    };
}

module.exports = Vector;