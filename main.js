const canvas = document.getElementById('raytracer');

if (canvas) {
    const ctx = canvas.getContext('2d');
    const raytracer = require("./lib/raytracer.js");
    render(raytracer, ctx);
}

function render(raytracer, ctx) {
    raytracer.init();
    const result = raytracer.start();

    for (let x = 0; x < 300; x++) {
        for (let y = 0; y < 300; y++) {
            if (result[x][y]) {
                let pixel = result[x][y];
                ctx.fillStyle = "rgb("+pixel.color.r+","+pixel.color.g+","+pixel.color.b+")";
                ctx.fillRect( x, y, 1, 1 );
            }
        }
    }
}
