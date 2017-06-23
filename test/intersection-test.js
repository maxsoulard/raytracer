QUnit.module( "Intersection", {});

QUnit.test("Rayon doesn't intersect sphere", function(assert) {
    const sphere1 = {rayon: 70, centre: new Vector(150.0, 150.0, -100)};
    var rayon = {origin: new Vector(0, 0, 1000), direction: new Vector(0, 0, -1)};
    const intersection = new Intersection(rayon, sphere1);
    const resultToAssert = intersection.getClosestIntersect();
    
    assert.strictEqual(resultToAssert, undefined);
});

QUnit.test("Random ray intersects sphere", function(assert) {
    const sphere1 = {rayon: 70, centre: new Vector(150.0, 150.0, -100)};
    let isIntersected = false;
    while (!isIntersected) {
        const oX = Math.round(Math.random() * (300 - 0) + 0);
        const oY = Math.round(Math.random() * (300 - 0) + 0);
        const oZ = Math.round(Math.random() * (1000 - 0) + 0);

        const dX = Math.round(Math.random() * (300 - 0) + 0);
        const dY = Math.round(Math.random() * (300 - 0) + 0);

        const rayon = {origin: new Vector(oX, oY, oZ), direction: new Vector(0, 0, -1)};
        const intersection = new Intersection(rayon, sphere1);
        const resultToAssert = intersection.getClosestIntersect();
        if (resultToAssert) {
            console.log("RAYON INTERSECT TROVUE : ");
            console.log("origine  = " + rayon.origin.x + " " + rayon.origin.y + " " + rayon.origin.z);
            console.log("direction  = " + rayon.direction.x + " " + rayon.direction.y + " " + rayon.direction.z);
            assert.ok(typeof resultToAssert != "undefined");
            isIntersected = typeof resultToAssert != "undefined";
        }
        else {
            console.log("RAYON INTERSECT NON TROVUE : ");
            console.log("origine  = " + rayon.origin.x + " " + rayon.origin.y + " " + rayon.origin.z);
            console.log("direction  = " + rayon.direction.x + " " + rayon.direction.y + " " + rayon.direction.z);
        }
    }
});