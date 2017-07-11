const Vector3 = require("vector-three");

function Light(light) {
    this.position = new Vector3(light.position.x, light.position.y, light.position.z);
    this.power = light.power;
    this.color = light.color;

    this.direction = function(dest) {
        return this.position.sub(dest);
    }
}

module.exports = Light;