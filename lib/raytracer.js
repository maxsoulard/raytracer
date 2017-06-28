const scene = require("../scene.js");
const Intersection = require("./intersection.js");
const Vector = require("./vector.js");
const Light = require("./light.js");

module.exports = {
    spheres: [],
    result: new Array(),

    init: function() {
        this.spheres.push(scene.spheres[0]);
        this.sceneLight = new Light(scene.light);
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
                let intersectionBetweenRayAndSphere = new Intersection(rayon, sphere);
                closest = intersectionBetweenRayAndSphere.getClosestIntersect();
                currentSphere = closest ? sphere : undefined;
            });

            if (currentSphere) {
                const lightDirection = this.sceneLight.direction(closest);
                pixel = {color: currentSphere.color};
                const normale = closest.sub(currentSphere.centre);
            }
        }

        return pixel;
    }
}