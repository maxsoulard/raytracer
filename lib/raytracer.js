const raytracer = {
    spheres: [],
    result: new Array(),

    init: function() {
        this.spheres.push(scene.spheres[0]);
        this.light = new Light(scene.light);
    },

    start: function() {
        // main loop
        for (var i = 0; i < 300; i++) {
            this.result[i] = new Array();
            for (let j = 0; j < 300; j++) {
                this.result[i][j] = this._randomWalk(i, j);
            }
        }

        return this.result;
    },

    _randomWalk: function(i, j) {
        let pixel;
        let rayon = {origin: new Vector(i, j, 1000), direction: new Vector(0, 0, -1)};
        let red = 0, green = 0, blue = 0;

        for (let level = 0; level < 3; level++) {
            let currentSphere;
            let closest;

            this.spheres.forEach(function(sphere) {
                let intersection = new Intersection(rayon, sphere);
                closest = intersection.getClosestIntersect();
                currentSphere = closest ? sphere : undefined;
            });

            if (currentSphere) {
                const lightDirection = this.light.direction(closest);
                pixel = {color: currentSphere.color};
            }
        }

        return pixel;
    }
}