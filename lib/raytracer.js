const scene = require("../scene.json");
const Intersection = require("./intersection.js");
const Vector3 = require("vector-three");
const Light = require("./light.js");
const Point = require("./point.js");

const EPSILON = 0.1;

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
        let ray = {origin: new Vector3(i, j, -1000), direction: new Vector3(0, 0, 1)};
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
        let minDistance = Infinity;

        let t = Infinity;
        this.spheres.some(function(sphere) {
            let intersectionBetweenRayAndSphere = new Intersection(ray, sphere).getClosestIntersect(t);
            closest = intersectionBetweenRayAndSphere.closest;
            t = intersectionBetweenRayAndSphere.t;
            if (closest) {
                const distance = Point.distanceBetween(closest, ray.origin);
                if (distance < minDistance) {
                    currentSphere = closest ? sphere : undefined;
                    return currentSphere;
                }
            }
        });

        return currentSphere ? this._computePixelColor(pixel, currentSphere, closest, ray) : {color: {r: 255, g: 255, b: 255}};
    },

    _computePixelColor: function(pixel, currentSphere, closest, ray) {
        pixel = this._lambertianReflectance(pixel, currentSphere, closest);
        return this._phongReflectance(pixel, currentSphere, closest, ray);
    },

    _lambertianReflectance: function(pixel, currentSphere, closest) {
        closest = closest.scale(0.01).add(closest);
        const lightDirection = this.sceneLight.direction(closest).normalize();

        let normale = closest.sub(currentSphere.centre);
        normale = normale.normalize();

        const isLightInFrontOfSurface = lightDirection.dotProduct(normale) > 0;

        if (isLightInFrontOfSurface) {
            let r = normale.dotProduct(lightDirection) * currentSphere.color.r * this.sceneLight.power;
            let g = normale.dotProduct(lightDirection) * currentSphere.color.g * this.sceneLight.power;
            let b = normale.dotProduct(lightDirection) * currentSphere.color.b * this.sceneLight.power;

            r = r < 255 ? Math.round(r) : 255;
            g = g < 255 ? Math.round(g) : 255;
            b = b < 255 ? Math.round(b) : 255;

            pixel.color.r += r;
            pixel.color.g += g;
            pixel.color.b += b;
        }
        
        return pixel;
    },

    _phongReflectance: function(pixel, currentSphere, closest, ray) {
        const magicPower = 60;

        const lightDirection = this.sceneLight.direction(closest).normalize();
        let normale = closest.sub(currentSphere.centre);
        normale = normale.normalize();
        let blinn = lightDirection.sub(ray.direction);
        const temp = Math.sqrt(blinn.dotProduct(blinn));

        if (temp !== 0) {
            blinn = blinn.scale(1 / temp);
            let blinnTerm = Math.max(blinn.dotProduct(normale), 0);
            blinnTerm = Math.pow(blinnTerm, magicPower);

            let r = blinnTerm * currentSphere.color.r * this.sceneLight.power;
            let g = blinnTerm * currentSphere.color.g * this.sceneLight.power;
            let b = blinnTerm * currentSphere.color.b * this.sceneLight.power;

            r = r < 255 ? Math.round(r) : 255;
            g = g < 255 ? Math.round(g) : 255;
            b = b < 255 ? Math.round(b) : 255;
            
            pixel.color.r += r;
            pixel.color.g += g;
            pixel.color.b += b;
        }

        return pixel;
    }
}