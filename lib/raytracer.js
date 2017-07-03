const scene = require("../scene.json");
const Intersection = require("./intersection.js");
const Vector3 = require("./vector3.js");
const Light = require("./light.js");
const Point = require("./point.js");

module.exports = {
    spheres: [],
    result: new Array(),

    init: function() {
        this.spheres = scene.spheres;
        this.sceneLight = new Light(scene.light);
        this.camera = scene.camera;
    },

    start: function() {
        // main loop
        for (var i = 0; i < scene.resolution.x; i++) {
            this.result[i] = new Array();
            for (let j = 0; j < scene.resolution.y; j++) {
                this.result[i][j] = this._walk(i, j);
            }
        }

        return this.result;
    },

    _walk: function(i, j) {
        let pixel = {color: {r: 0, g: 0, b: 0}};
        let ray = {origin: new Vector3(i, j, 1000), direction: new Vector3(0, 0, -1)};
        const cameraPosition = Vector3.fromObject(this.camera.position);
        const rayDirection = cameraPosition.sub(new Vector3(i, j, 0));
        //let ray = {origin: cameraPosition, direction: rayDirection};
        
        let red = 0, green = 0, blue = 0;

        for (let level = 0; level < 4; level++) {
            pixel = this._computePixel(pixel, ray, level);
        }

        return pixel;
    },

    _computePixel: function(pixel, ray, level) {
        let currentSphere;
        let closest;

        this.spheres.some(function(sphere) {
            let intersectionBetweenRayAndSphere = new Intersection(ray, sphere);
            closest = intersectionBetweenRayAndSphere.getClosestIntersect();
            currentSphere = closest ? sphere : undefined;
            return currentSphere;
        });

        return currentSphere ? this._pixelFromIntersectedSphere(pixel, currentSphere, closest) : {color: {r: 255, g: 255, b: 255}};
    },

    _pixelFromIntersectedSphere: function(pixel, currentSphere, closest) {
        let normale = closest.sub(currentSphere.centre);
        normale = normale.normalize();
        const lightDirection = this.sceneLight.direction(closest).normalize();
        
        let r = normale.dotProduct(lightDirection) * currentSphere.color.r * this.sceneLight.power / 255;
        let g = normale.dotProduct(lightDirection) * currentSphere.color.g * this.sceneLight.power / 255;
        let b = normale.dotProduct(lightDirection) * currentSphere.color.b * this.sceneLight.power / 255;

        r = r < 255 ? Math.round(r) : 255;
        g = g < 255 ? Math.round(g) : 255;
        b = b < 255 ? Math.round(b) : 255;

        //pixel = {color: {r: r, g: g, b: b}};
        pixel.color.r += r;
        pixel.color.g += g;
        pixel.color.b += b;

        // determine if point is in shadow
        let inShadow = false;
        const newLightRay = {origin: closest, direction: lightDirection};
        this.spheres.some(function(sphere) {
            let intersectionBetweenRayAndSphere = new Intersection(newLightRay, sphere);
            const rayIntersectAnotherSphere = intersectionBetweenRayAndSphere.getClosestIntersect() && sphere != currentSphere;
            if (rayIntersectAnotherSphere)
                inShadow = true;
            return inShadow;
        });
        
        if (inShadow)
            pixel.color = {r: 0, g: 0, b: 0};
        
        return pixel;
    }
}