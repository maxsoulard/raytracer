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
            Point.calculateAngleBetween();
        }, TypeError, "Point.calculateAngleBetween called, a TypeError is thrown");
});

/*QUnit.test("Calculate angle from 3 points", function(assert) {
    // ARRANGE
    let p1 = new Point(20, 20, 20);
    let p2 = new Point(40, 20, 10);
    let p3 = new Point(10, 40, 20);
    // ACT
    let result = Point.calculateAngleBetween(p1, p2, p3);
    // ASSERT
    assert.strictEqual(result, 90);
});*/

function returnCoordinatesObject(p) {
    return {x: p.x, y: p.y, z: p.z};
}