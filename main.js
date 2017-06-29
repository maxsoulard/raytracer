const scene = require("./scene.json");

const canvas = document.getElementById('raytracer');

if (canvas) {
    const ctx = canvas.getContext('2d');
    const raytracer = require("./lib/raytracer.js");
    render(raytracer, ctx);
}

function render(raytracer, ctx) {
    raytracer.init();
    const result = raytracer.start();

    for (let x = 0; x < scene.resolution.x; x++) {
        for (let y = 0; y < scene.resolution.y; y++) {
            if (result[x][y]) {
                let pixel = result[x][y];
                ctx.fillStyle = "rgb("+pixel.color.r+","+pixel.color.g+","+pixel.color.b+")";
                ctx.fillRect( x, y, 1, 1 );
            }
        }
    }
}
