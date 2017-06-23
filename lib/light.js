function Light(position, power, colors) {
    this.position = position;
    this.power = power;
    this.colors = colors;

    this.direction = function(closest) {
        return this.position.sub(closest);
    }
}