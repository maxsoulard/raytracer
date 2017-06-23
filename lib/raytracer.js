var raytracer = {
    spheres: [],

    init: function() {
        let sphere1 = {rayon: 70, centre: new Vector(150.0, 150.0, -100)};
        spheres.push(sphere1);
        light = new Light(new Vector(150, 0, 150), 210, {r: 255, g: 255, b: 255}); 
    },

    start: function() {
        // main loop
        for (var i = 0; i < 300; i++) {
            for (let j = 0; j < 300; j++) {
                this.randomWalk(i, j);
            }
        }
    },

    randomWalk: function(i, j) {
        let rayon = {origin: new Vector(i, j, 1000), direction: new Vector(0, 0, -1)};
        let red = 0, green = 0, blue = 0;

        for (let level = 0; level < 10; level++) {
            let currentSphere;
            let closest;
            // TODO plus proche intersection

            spheres.forEach(function(sphere) {
                let intersection = new Intersection(rayon, sphere);
                closest = intersection.getClosestIntersect();
                currentSphere = closest ? sphere : undefined;
            });

            if (currentSphere) {
                const lightDirection = light.direction(closest);
            }
        }
    }
}