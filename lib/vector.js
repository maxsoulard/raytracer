function Vector(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0
}

Vector.prototype = {
    add: function(v) {
        return v instanceof Vector ? new Vector(this.x + v.x, this.y + v.y, this.z + v.z) : null;
    },
    sub: function(v) {
        return v instanceof Vector ? new Vector(this.x - v.x, this.y - v.y, this.z - v.z) : null;
    },
    dot: function(v) {
        return v instanceof Vector ? new Vector(this.x * v.x, this.y * v.y, this.z * v.z) : null;
    },
    crossProduct: function(v) {
        const x = this.y * v.z - this.z * v.y
            , y = this.z * v.x - this.x * v.z
            , z = this.x * v.y - this.y * v.x;
        return v instanceof Vector ? new Vector(x, y, z) : null;
    }
}

module.exports = Vector;