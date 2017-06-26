const Vector = require("../lib/vector.js");

QUnit.module( "Vector", {});

QUnit.test("Add two vectors, returns a new vector", function(assert) {
    const vec1 = new Vector(10, 10, 10), vec2 = new Vector(10, 10, 10);
    const expected = {x: 20, y: 20, z: 20};
    // ACT
    const result = vec1.add(vec2);    

    assert.deepEqual(returnCoordinatesObject(result), expected);
});

QUnit.test("Sub two vectors, returns a new vector", function(assert) {
    const vec1 = new Vector(10, 10, 10), vec2 = new Vector(10, 10, 10);
    const expected = {x: 0, y: 0, z: 0};
    // ACT
    const result = vec1.sub(vec2);

    assert.deepEqual(returnCoordinatesObject(result), expected);
});

QUnit.test("Dot two vectors, returns a new vector", function(assert) {
    const vec1 = new Vector(10, 10, 10), vec2 = new Vector(10, 10, 10);
    const expected = {x: 100, y: 100, z: 100};
    // ACT
    const result = vec1.dot(vec2);

    assert.deepEqual(returnCoordinatesObject(result), expected);
});

QUnit.test("Cross product two vectors, returns a new vector", function(assert) {
    const vec1 = new Vector(10, 15, 25), vec2 = new Vector(20, 25, 35);
    const expected = {x: -100, y: 150, z: -50};
    // ACT
    const result = vec1.crossProduct(vec2);

    assert.deepEqual(returnCoordinatesObject(result), expected);
});

function returnCoordinatesObject(vec) {
    return {x: vec.x, y: vec.y, z: vec.z};
}