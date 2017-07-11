const Vector3 = require("vector-three");

function Intersection(rayon, sphere) {
    this._rayon = rayon;
    this._sphere = sphere;
    this.t = Infinity;

    this.getClosestIntersect = function(t) {
        this.t = t || Infinity;

        // Calculate closest intersection between Ray and Sphere.
        var a, b, c = 0;

        // Solve 2nd degree equation
        a = Math.pow(this._rayon.direction.x, 2) + Math.pow(this._rayon.direction.y, 2) + Math.pow(this._rayon.direction.z, 2);
        b = 2 * this._rayon.direction.x * (this._rayon.origin.x - this._sphere.centre.x) + 2 * this._rayon.direction.y * (this._rayon.origin.y - this._sphere.centre.y) + 2 * this._rayon.direction.z * (this._rayon.origin.z - this._sphere.centre.z);
        c = -Math.pow(this._sphere.rayon, 2) + Math.pow((this._rayon.origin.x - this._sphere.centre.x), 2) + Math.pow((this._rayon.origin.y - this._sphere.centre.y), 2) + Math.pow((this._rayon.origin.z - this._sphere.centre.z), 2);

        this.closest = this.getClosestFromDelta(a, b, c);
        return this;
    },

    this.getClosestFromDelta = function(a, b, c) {
        var delta = this.calculateDelta(a, b, c);

        if (delta < 0) {
            return; // no solution
        } else {
            if (delta === 0) {
                this.t = -b / (2*a); // One possible solution
            }

            if (delta > 0) {
                // Two solutions, will get the smallest t
                const t1 = (-b - Math.sqrt(delta))/(2*a);
                const t2 = (-b + Math.sqrt(delta))/(2*a);

                if((t1 > 0) && (t1 < this.t)) {
                    this.t = t1;
                }
                else if ((t2 > 0) && (t2 < this.t)) {
                    this.t = t2;
                }
            }

            // Determine closest dot coordinates
            const closest = this.getClosestDotCoordinates(this._rayon, this.t);
            return closest;
        }
    },

    this.calculateDelta = function(a, b, c) {
        return Math.pow(b, 2) - 4 * a * c;
    },

    this.getClosestDotCoordinates = function(rayon, t) {
        return new Vector3(rayon.origin.x + t * rayon.direction.x, rayon.origin.y + t * rayon.direction.y, 
                        rayon.origin.z + t * rayon.direction.z);
    }
}

module.exports = Intersection;