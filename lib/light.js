const Vector = require("./vector.js");

function Light(light) {
    this.position = new Vector(light.position.x, light.position.y, light.position.z);
    this.power = light.power;
    this.colors = light.colors;

    this.direction = function(closest) {
        return this.position.sub(closest);
    }
}

module.exports = Light;