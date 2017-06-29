const chai = require('chai');
const expect = chai.expect;
const Vector3 = require("../lib/vector3.js");

describe('Vector3', function() {
  it('should return a Vector3 from an object', fromObject);
  it('should add two vectors and returns a new vector : {x: 20, y: 20, z: 20}', addTwoVectors);
  it('should sub two vectors Vector3(10, 10, 10) and Vector3(10, 10, 10), returns a new vector : {x: 0, y: 0, z: 0}', subTwoVectors);
  it('should multiply two vectors Vector(10, 10, 10) and Vector(10, 10, 10), returns a new vector : {x: 100, y: 100, z: 100}', multiplyTwoVectors);
  it('should cross product two vectors Vector3(10, 15, 25) and Vector3(20, 25, 35), returns a new vector : {x: -100, y: 150, z: -50}', crossProductTwoVectors);
  it('should dot product two vectors Vector3(10, 15, 25) and Vector3(20, 25, 35), returns a dot product : the result is 1450 (x: 10 * 10 = 200 + y: 15 * 25 = 375 + z: 25 * 35 = 875)', dotProductTwoVectors);
  it('should calculate norm (or length) of a Vector3 (45, 10, 20) = ~50', normOfAVector);
  it('should normalize Vector3 (45, 10, 20) : get unit vector with norm = 1', normalizeAVector);
  it('should calculate the angle between vec1(40, 200, -100) and vec2(10, 40, 200) ~= 104°', angleBetweenTwoVectors);
  it('should throw TypeError exception when instanceof param NOT object', typeErrorThrown);
});

function fromObject(done) {
    // ARRANGE
    const vec1 = {x: 10, y: 10, z: 10};
    // ACT
    const result = Vector3.fromObject(vec1);
    // ASSERT
    expect(result).to.be.an.instanceof(Vector3);
    done();
}

function addTwoVectors(done) {
    // ARRANGE
    const vec1 = new Vector3(10, 10, 10), vec2 = new Vector3(10, 10, 10);
    const expected = {x: 20, y: 20, z: 20};
    // ACT
    const result = vec1.add(vec2);
    // ASSERT
    expect(returnCoordinatesObject(result)).to.deep.equal(expected);
    done();
}

function subTwoVectors(done) {
    // ARRANGE
    const vec1 = new Vector3(10, 10, 10), vec2 = new Vector3(10, 10, 10);
    const expected = {x: 0, y: 0, z: 0};
    // ACT
    const result = vec1.sub(vec2);
    // ASSERT
    expect(returnCoordinatesObject(result)).to.deep.equal(expected);
    done();
}

function multiplyTwoVectors(done) {
    // ARRANGE
    const vec1 = new Vector3(10, 10, 10), vec2 = new Vector3(10, 10, 10);
    const expected = {x: 100, y: 100, z: 100};
    // ACT
    const result = vec1.multiply(vec2);
    // ASSERT
    expect(returnCoordinatesObject(result)).to.deep.equal(expected);
    done();
}

function crossProductTwoVectors(done) {
    // ARRANGE
    const vec1 = new Vector3(10, 15, 25), vec2 = new Vector3(20, 25, 35);
    const expected = {x: -100, y: 150, z: -50};
    // ACT
    const result = vec1.crossProduct(vec2);
    // ASSERT
    expect(returnCoordinatesObject(result)).to.deep.equal(expected);
    done();
}

function dotProductTwoVectors(done) {
    // ARRANGE
    const vec1 = new Vector3(10, 15, 25), vec2 = new Vector3(20, 25, 35);
    const expected = 1450; // x: 10 * 10 = 200 + y: 15 * 25 = 375 + z: 25 * 35 = 875
    // ACT
    const result = vec1.dotProduct(vec2);
    // ASSERT
    expect(result).to.equal(expected);
    done();
}

function normOfAVector(done) {
    // ARRANGE
    const vec1 = new Vector3(45, 10, 20);
    const expected = 50;
    // ACT
    const result = vec1.norm();
    // ASSERT
    expect(Math.round(result)).to.equal(expected);
    done();
}

function normalizeAVector(done) {
    // ARRANGE
    const vec1 = new Vector3(45, 10, 20);
    // ACT
    const vecNormalized = vec1.normalize();
    const result = vecNormalized.norm();
    // ASSERT
    expect(Math.round(result)).to.equal(1);
    done();
}

function angleBetweenTwoVectors(done) {
    // ARRANGE
    const vec1 = new Vector3(40, 200, -100);
    const vec2 = new Vector3(10, 40, 200);
    // ACT
    const result = Vector3.angleBetween(vec1, vec2);
    // ASSERT
    expect(Math.round(result.toDegrees())).to.equal(104);
    done();
}


function typeErrorThrown(done) {
    // ARRANGE
    const vec1 = new Vector3(10, 15, 25), vec2 = 0;
    const expected = {x: -100, y: 150, z: -50};
    const dotProduct = function() {
        vec1.dotProduct(vec2) 
    };
    const crossProduct = function() {
        vec1.crossProduct(vec2) 
    };
    const sub = function() {
        vec1.sub(vec2) 
    };
    const add = function() {
        vec1.add(vec2) 
    };
    const dot = function() {
        vec1.dot(vec2) 
    };
    // ACT & ASSERT
    expect(dotProduct).to.throw(TypeError);
    expect(crossProduct).to.throw(TypeError);
    expect(sub).to.throw(TypeError);
    expect(add).to.throw(TypeError);
    expect(dot).to.throw(TypeError);
    done();
}

function returnCoordinatesObject(vec) {
    return {x: vec.x, y: vec.y, z: vec.z};
}