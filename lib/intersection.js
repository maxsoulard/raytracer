function Intersection(rayon, sphere) {
    this._rayon = rayon;
    this._sphere = sphere;

    this.getClosestIntersect = function() {
        // Calculate closest intersection between Ray and Sphere.
        let a, b, c = 0;

        // Solve 2nd degree equation
        a = Math.pow(this._rayon.direction.x, 2) + Math.pow(this._rayon.direction.y, 2) + Math.pow(this._rayon.direction.z, 2);
        b = 2 * this._rayon.direction.x * (this._rayon.origin.x - this._sphere.centre.x) + 2 * this._rayon.direction.y * (this._rayon.origin.y - this._sphere.centre.y) + 2 * this._rayon.direction.z * (this._rayon.origin.z - this._sphere.centre.z);
        c = -Math.pow(this._sphere.rayon, 2) + Math.pow((this._rayon.origin.x - this._sphere.centre.x), 2) + Math.pow((this._rayon.origin.y - this._sphere.centre.y), 2) + Math.pow((this._rayon.origin.z - this._sphere.centre.z), 2);

        let delta = Math.pow(b, 2) - 4 * a * c;

        if (delta < 0) {
            return; // no solution
        } else {
            let t = 9999;   // FIXME for comparison

            if (delta === 0) {
                t = -b / (2*a); // One possible solution
            }

            if (delta > 0) {
                // Two solutions, will get the smallest t
                let t1 = (-b - Math.sqrt(delta))/(2*a);
                let t2 = (-b + Math.sqrt(delta))/(2*a);

                if((t1 < t) && (t1 < t2)) {
                    t = t1;
                }
                else if ((t2 < t) && (t2 < t1)) {
                    t = t2;
                }
            }

            // Determine closest dot coordinates
            let closest = this.determineClosestDotCoordinates(this._rayon, t);
            return closest;
        }       
    },

    this.determineClosestDotCoordinates = function(rayon, t) {
        return new Vector(rayon.origin.x + t * rayon.direction.x, rayon.origin.y + t * rayon.direction.y, 
                        rayon.origin.z + t * rayon.direction.z);
    }
}