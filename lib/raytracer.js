const scene = require("../scene.js");
const Intersection = require("./intersection.js");
const Vector3 = require("./vector3.js");
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
        let ray = {origin: new Vector3(i, j, 1000), direction: new Vector3(0, 0, -1)};
        let red = 0, green = 0, blue = 0;

        for (let level = 0; level < 3; level++) {
            let currentSphere;
            let closest;

            this.spheres.forEach(function(sphere) {
                let intersectionBetweenRayAndSphere = new Intersection(ray, sphere);
                closest = intersectionBetweenRayAndSphere.getClosestIntersect();
                currentSphere = closest ? sphere : undefined;
            });

            if (currentSphere) {
                const lightDirection = this.sceneLight.direction(closest);
                pixel = {color: currentSphere.color};
                let normale = closest.sub(currentSphere.centre);
                normale = normale.normalize();

                /*let lightRay = {origin: closest, direction: lightDirection};

                // determine if point is in shadow
                let inShadow = false;
                this.spheres.forEach(function(sphere) {
                    let intersectionBetweenRayAndSphere = new Intersection(lightRay, sphere);
                    inShadow = intersectionBetweenRayAndSphere.getClosestIntersect() ? true : false;
                });

                // calculate colors
                if (!inShadow) {
                    this._calculateColors(closest, sceneLight.position, currentSphere.centre);
                }*/
            }
        }

        return pixel;
    },

    _calculateColors: function(closest, lightPosition, sphereCentre) {
        let theta = this._angleBetween(closest, lightPosition, sphereCentre);
    },

    _angleBetween: function(a, b, c) {
        
    }
}