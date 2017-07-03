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
        let pixel;
        //let ray = {origin: new Vector3(i, j, 1000), direction: new Vector3(0, 0, -1)};
        const cameraPosition = Vector3.fromObject(this.camera.position);
        const rayDirection = cameraPosition.sub(new Vector3(i, j, 0));
        let ray = {origin: cameraPosition, direction: rayDirection};
        
        let red = 0, green = 0, blue = 0;

        for (let level = 0; level < 2; level++) {
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

        return currentSphere ? this._pixelFromIntersectedSphere(currentSphere, closest) : pixel;
    },

    _pixelFromIntersectedSphere: function(currentSphere, closest) {
        const lightDirection = this.sceneLight.direction(closest).normalize();
        pixel = {color: currentSphere.color};
        let normale = closest.sub(currentSphere.centre);
        normale = normale.normalize();

        let lightRay = {origin: closest, direction: lightDirection};

        // determine if point is in shadow
        let inShadow = false;
        this.spheres.some(function(sphere) {
            if (sphere != currentSphere) {
                let intersectionBetweenRayAndSphere = new Intersection(lightRay, sphere);
                inShadow = intersectionBetweenRayAndSphere.getClosestIntersect() ? true : false;
                return inShadow;
            }
        });

        // calculate pixel color
        let pixelColor = this._calculateColor(closest, this.sceneLight, currentSphere, normale);
        
        /*if (inShadow)
            pixelColor = {r: 0, g: 0, b: 0};*/
        
        return {color: pixelColor};
    },

    _calculateColor: function(closest, light, sphere, normale) {
        // determine light factor
        const theta = Point.angleBetween(light.position, closest, sphere.centre).inRad;
        //normale.dotProduct(light.direction(closest))
        const factor = Math.cos(theta) *
            light.power / (Point.distanceBetween(light.position, closest));        

        return this._colorFromItems(sphere, light, factor);
    },

    _colorFromItems(sphere, light, factor) {
        const color = {r: 0, g: 0, b: 0};

        if (factor > 0 ) { // point is not in shadow
            const red = sphere.color.r * factor * light.color.r / 255;
            const green = sphere.color.g * factor * light.color.g / 255;
            const blue = sphere.color.b * factor * light.color.b / 255;

            color.r = red > 255 ? 255 : Math.round(red);
            color.g = green > 255 ? 255 : Math.round(green);
            color.b = blue > 255 ? 255 : Math.round(blue);
        }

        return color;        
    }
}