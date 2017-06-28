function Point(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    this.fromObject = function(o) {
        return new Point(o.x, o.y, o.z);
    };
}

Point.calculateAngleBetween = function(a, b, c) {
        if (!a instanceof Object)    throw TypeError();
        if (!b instanceof Object)    throw TypeError();
        if (!c instanceof Object)    throw TypeError();

        /** calculate angle between 3 points
         * θ = arcos((|BA|² + |CA|² - |BC|²) / (2 * |BA| * |CA|))
         */

        b = new Vector(b.x, b.y, b.z);
        const baSquared = b.sub(a).dot(b);

        const bcSquared = b.sub(c).dot(b);

        c = new Vector(c.x, c.y, c.z);
        const caSquared = c.sub(a).dot(c);

        /*const normeLSqd =   Math.pow((b.x-a.x), 2) +
                            Math.pow((b.y-a.y), 2) +
                            Math.pow((b.z-a.z), 2);

        const normeCSqd =   Math.pow((b.x-c.x), 2) +
                            Math.pow((b.y-c.y), 2) +
                            Math.pow((b.z-c.z), 2);

        const normeNSqd =   Math.pow((c.x-a.x), 2) +
                            Math.pow((c.y-a.y), 2) +
                            Math.pow((c.z-a.z), 2);*/

        /*          Math.pow((c.x-a.x), 2) +
                    Math.pow((c.y-a.y), 2) +
                    Math.pow((c.z-a.z), 2)
        */
}

module.exports = Point;