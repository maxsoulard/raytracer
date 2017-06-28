const Intersection = require("../lib/intersection.js");
const Vector = require("../lib/vector3.js");

QUnit.module( "Intersection", {});

QUnit.test("Rayon doesn't intersect sphere", function(assert) {
    assert.expect(1);
    // ARRANGE
    const sphere1 = {rayon: 70, centre: new Vector(150.0, 150.0, -100)};
    var rayon = {origin: new Vector(0, 0, 1000), direction: new Vector(0, 0, -1)};
    const intersection = new Intersection(rayon, sphere1);
    // ACT
    const resultToAssert = intersection.getClosestIntersect();
    // ASSERT
    assert.strictEqual(resultToAssert, undefined);
});

QUnit.test("Calculate Delta", function(assert) {
    assert.expect(1);
    // ARRANGE
    const sphere1 = {rayon: 70, centre: new Vector(150.0, 150.0, -100)};
    var rayon = {origin: new Vector(0, 0, 1000), direction: new Vector(0, 0, -1)};
    const intersection = new Intersection(rayon, sphere1);
    // ACT
    let result = intersection.calculateDelta(5, 4, 8);
    // ASSERT
    assert.strictEqual(result, -144); // 4^2 - 4 * 5 * 8 = -144;
});

QUnit.test("Get closest from Delta - no solution", function(assert) {
    assert.expect(1);
    // ARRANGE
    const sphere1 = {rayon: 70, centre: new Vector(150.0, 150.0, -100)};
    var rayon = {origin: new Vector(0, 0, 1000), direction: new Vector(0, 0, -1)};
    const intersection = new Intersection(rayon, sphere1);
    // ACT
    let result = intersection.getClosestFromDelta(5, 4, 8);
    // ASSERT
    assert.strictEqual(result, undefined); // 4^2 - 4 * 5 * 8 = -144; so delta is undefined
});

QUnit.test("Random ray intersects sphere", function(assert) {
    assert.expect(1);
    // ARRANGE
    const sphere1 = {rayon: 70, centre: new Vector(150.0, 150.0, -100)};
    let isIntersected = false;
    // ACT
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
    // ASSERT
    assert.ok(isIntersected);
});