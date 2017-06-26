function Vector(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0
}

Vector.prototype = {
    add: function(v) {
        if (v instanceof Vector)    return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
        else                        throw new TypeError();
    },
    sub: function(v) {
        if (v instanceof Vector)    return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
        else                        throw new TypeError();
    },
    dot: function(v) {
        if (v instanceof Vector)    return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
        else                        throw new TypeError();
    },
    crossProduct: function(v) {
        const x = this.y * v.z - this.z * v.y
            , y = this.z * v.x - this.x * v.z
            , z = this.x * v.y - this.y * v.x;
        if (v instanceof Vector)    return new Vector(x, y, z);
        else                        throw new TypeError();
    }
}

module.exports = Vector;