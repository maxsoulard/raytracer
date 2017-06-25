window.onload = function() {
    raytracer.init();
    const result = raytracer.start();

    const canvas = document.getElementById('raytracer');
    const ctx = canvas.getContext('2d');

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
