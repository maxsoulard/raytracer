const Intersection = require("../lib/intersection.js");
const Vector = require("../lib/vector.js");

QUnit.module( "Intersection", {});

QUnit.test("Rayon doesn't intersect sphere", function(assert) {
    assert.expect(1);

    const sphere1 = {rayon: 70, centre: new Vector(150.0, 150.0, -100)};
    var rayon = {origin: new Vector(0, 0, 1000), direction: new Vector(0, 0, -1)};
    const intersection = new Intersection(rayon, sphere1);
    const resultToAssert = intersection.getClosestIntersect();
    
    assert.strictEqual(resultToAssert, undefined);
});

QUnit.test("Calculate Delta", function(assert) {
    assert.expect(1);

    const sphere1 = {rayon: 70, centre: new Vector(150.0, 150.0, -100)};
    var rayon = {origin: new Vector(0, 0, 1000), direction: new Vector(0, 0, -1)};
    const intersection = new Intersection(rayon, sphere1);

    let result = intersection.calculateDelta(5, 4, 8);

    assert.strictEqual(result, -144); // 4^2 - 4 * 5 * 8 = -144;
});

QUnit.test("Random ray intersects sphere", function(assert) {
    assert.expect(1);

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
        isIntersected = typeof resultToAssert != "undefined";
    }

    assert.ok(isIntersected);
});