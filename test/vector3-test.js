const Vector3 = require("../lib/vector3.js");

QUnit.module( "Vector3", {});

QUnit.test("Add two vectors, returns a new vector", function(assert) {
    // ARRANGE
    const vec1 = new Vector3(10, 10, 10), vec2 = new Vector3(10, 10, 10);
    const expected = {x: 20, y: 20, z: 20};
    // ACT
    const result = vec1.add(vec2);
    // ASSERT
    assert.deepEqual(returnCoordinatesObject(result), expected, "After addition, the new vector is : {x: 20, y: 20, z: 20}");
});

QUnit.test("Sub two vectors Vector3(10, 10, 10) and Vector3(10, 10, 10), returns a new vector", function(assert) {
    // ARRANGE
    const vec1 = new Vector3(10, 10, 10), vec2 = new Vector3(10, 10, 10);
    const expected = {x: 0, y: 0, z: 0};
    // ACT
    const result = vec1.sub(vec2);
    // ASSERT
    assert.deepEqual(returnCoordinatesObject(result), expected, "After substraction, the new vector is : {x: 0, y: 0, z: 0}");
});

QUnit.test("Multiply two vectors Vector(10, 10, 10) and Vector(10, 10, 10), returns a new vector", function(assert) {
    // ARRANGE
    const vec1 = new Vector3(10, 10, 10), vec2 = new Vector3(10, 10, 10);
    const expected = {x: 100, y: 100, z: 100};
    // ACT
    const result = vec1.multiply(vec2);
    // ASSERT
    assert.deepEqual(returnCoordinatesObject(result), expected, "After multiplication, the new vector is : {x: 100, y: 100, z: 100}");
});

QUnit.test("Cross product two vectors Vector3(10, 15, 25) and Vector3(20, 25, 35), returns a new vector", function(assert) {
    // ARRANGE
    const vec1 = new Vector3(10, 15, 25), vec2 = new Vector3(20, 25, 35);
    const expected = {x: -100, y: 150, z: -50};
    // ACT
    const result = vec1.crossProduct(vec2);
    // ASSERT
    assert.deepEqual(returnCoordinatesObject(result), expected, "After cross product, the new vector is : {x: -100, y: 150, z: -50}");
});

QUnit.test("Dot product two vectors Vector3(10, 15, 25) and Vector3(20, 25, 35), returns a dot product", function(assert) {
    // ARRANGE
    const vec1 = new Vector3(10, 15, 25), vec2 = new Vector3(20, 25, 35);
    const expected = 1450; // x: 10 * 10 = 200 + y: 15 * 25 = 375 + z: 25 * 35 = 875
    // ACT
    const result = vec1.dotProduct(vec2);
    // ASSERT
    assert.strictEqual(result, 1450, "Dot product, the result is 1450 (x: 10 * 10 = 200 + y: 15 * 25 = 375 + z: 25 * 35 = 875)");
});

QUnit.test("Type error is thrown", function(assert) {
    // ARRANGE
    const vec1 = new Vector3(10, 15, 25), vec2 = 0;
    const expected = {x: -100, y: 150, z: -50};
    // ACT
    // ASSERT
    assert.throws(function() { 
            vec1.crossProduct(vec2);
        }, TypeError, "Vector3.crossProduct called, a TypeError is thrown");
    assert.throws(function() { 
            vec1.add(vec2);
        }, TypeError, "Vector3.add called, a TypeError is thrown");
    assert.throws(function() { 
            vec1.sub(vec2);
        }, TypeError, "Vector3.sub called, a TypeError is thrown");
    assert.throws(function() {
            vec1.dotProduct(vec2);
        }, TypeError, "Vector3.dot called, a TypeError is thrown");
});

QUnit.test("Norm of a Vector3 (45, 10, 20)", function(assert) {
    // ARRANGE
    const vec1 = new Vector3(45, 10, 20);
    const expected = 50;
    // ACT
    const result = vec1.norm();
    // ASSERT
    assert.strictEqual(Math.round(result), expected, "The length (or norm) of the vector is ~50");
});

QUnit.test("Normalize Vector3 (45, 10, 20) : get unit vector", function(assert) {
    // ARRANGE
    const vec1 = new Vector3(45, 10, 20);
    // ACT
    const vecNormalized = vec1.normalize();
    const result = vecNormalized.norm();

    // ASSERT
    assert.strictEqual(result, 1, "The normalized vector' norm is 1, it is a unit vector");
});

QUnit.test("Angle between two vectors", function(assert) {
    // ARRANGE
    const vec1 = new Vector3(40, 200, -100);
    const vec2 = new Vector3(10, 40, 200);

    // ACT
    const result = Vector3.angleBetween(vec1, vec2);

    // ASSERT
    assert.strictEqual(Math.round(result.toDegrees()), 104, "The angle between vec1 and vec2 is 104°");
});


function returnCoordinatesObject(vec) {
    return {x: vec.x, y: vec.y, z: vec.z};
}