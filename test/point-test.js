const Point = require("../lib/point.js");

QUnit.module( "Point", {});

QUnit.test("Construct Point from object", function(assert) {
    // ARRANGE
    let p1 = new Point();
    const expected = {x: 20, y: 20, z: 20};
    // ACT
    p1 = p1.fromObject({x: 20, y: 20, z: 20});
    // ASSERT
    assert.deepEqual(returnCoordinatesObject(p1), expected);
});

QUnit.test("Type error is thrown", function(assert) {
    // ARRANGE
    // ACT
    // ASSERT
    assert.throws(function() { 
            Point.angleBetween();
        }, TypeError, "Point.angleBetween called, a TypeError is thrown");
});

QUnit.test("Length between two points", function(assert) {
    // ARRANGE
    let p1 = new Point(20, 20, 20);
    let p2 = new Point(30, 10, 0);
    const expected = 24;
    // ACT
    let result = Point.lengthBetween(p1, p2);
    // ASSERT
    assert.strictEqual(Math.round(result), expected, "length P1P2 = sqrt((20 - 30)² + (20 - 10)² + (20 - 0)²) ~= 24");
});

QUnit.test("Calculate angle from 3 points", function(assert) {
    // ARRANGE
    let p1 = new Point(200, 20, 20);
    let p2 = new Point(40, 200, 10);
    let p3 = new Point(10, 40, 200);
    // ACT
    let result = Point.angleBetween(p1, p2, p3).toDegrees();
    // ASSERT
    assert.strictEqual(Math.round(result), 59);
});

function returnCoordinatesObject(p) {
    return {x: p.x, y: p.y, z: p.z};
}