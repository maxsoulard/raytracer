const chai = require('chai');
const expect = chai.expect;
const Intersection = require("../lib/intersection.js");
const Vector3 = require("../lib/vector3.js");

describe('Intersection', function() {
  it('shouldnt return intersected point', closestIntersectHasNoSolution);
  it('should return negative delta', negativeDelta);
  it('should have no solution', noSolution);
  it('should return at least one solution', randomRayIntersectSphere);
});

function closestIntersectHasNoSolution(done) {
    // ARRANGE
    const sphere1 = {rayon: 70, centre: new Vector3(150.0, 150.0, -100)};
    var rayon = {origin: new Vector3(0, 0, 1000), direction: new Vector3(0, 0, -1)};
    const intersection = new Intersection(rayon, sphere1);
    // ACT
    const resultToAssert = intersection.getClosestIntersect();
    // ASSERT
    expect(resultToAssert).to.be.an('undefined');
    done();
}

function negativeDelta(done) {
    // ARRANGE
    const sphere1 = {rayon: 70, centre: new Vector3(150.0, 150.0, -100)};
    const rayon = {origin: new Vector3(0, 0, 1000), direction: new Vector3(0, 0, -1)};
    const intersection = new Intersection(rayon, sphere1);
    const expected = -144;
    // ACT
    const result = intersection.calculateDelta(5, 4, 8);
    // ASSERT
    expect(result).to.be.equal(expected); // 4^2 - 4 * 5 * 8 = -144;
    done();
}

function noSolution(done) {
    // ARRANGE
    const sphere1 = {rayon: 70, centre: new Vector3(150.0, 150.0, -100)};
    const rayon = {origin: new Vector3(0, 0, 1000), direction: new Vector3(0, 0, -1)};
    const intersection = new Intersection(rayon, sphere1);
    // ACT
    const resultToAssert = intersection.getClosestFromDelta(5, 4, 8);
    // ASSERT
    expect(resultToAssert).to.be.an('undefined');
    done();
}

function randomRayIntersectSphere(done) {
    // ARRANGE
    const sphere1 = {rayon: 70, centre: new Vector3(150.0, 150.0, -100)};
    var isIntersected = false;
    const rayon = {origin: new Vector3(142, 147, 266), direction: new Vector3(0, 0, -1)};
    const intersection = new Intersection(rayon, sphere1);
    // ACT
    const resultToAssert = intersection.getClosestIntersect();
    // ASSERT
    expect(resultToAssert).to.be.an('Object');
    expect(resultToAssert.x).to.equal(142);
    expect(resultToAssert.y).to.equal(147);
    expect(Math.round(resultToAssert.z)).to.equal(-31);
    done();
}