const chai = require('chai');
const expect = chai.expect;
const Point = require("../lib/point.js");

describe('Point', function() {
  it('should throw TypeError exception when instanceof param NOT object', typeErrorThrown);
  it('should return length between P1(20, 20, 20) and P2(30, 10, 0) = sqrt((20 - 30)² + (20 - 10)² + (20 - 0)²) ~= 24', lengthBetween);
  it('should calculate angle from 3 points', angleFrom3Points);
});

function typeErrorThrown(done) {
    // ARRANGE
    const angleBetween = function() {
        Point.angleBetween();
    };
    // ACT & ASSERT
    expect(angleBetween).to.throw(TypeError);
    done();
}

function lengthBetween(done) {
    // ARRANGE
    const p1 = new Point(20, 20, 20);
    const p2 = new Point(30, 10, 0);
    const expected = 24;
    // ACT
    const result = Point.lengthBetween(p1, p2);
    // ASSERT
    expect(expected).to.equal(Math.round(result));
    done();
}

function angleFrom3Points(done) {
    // ARRANGE
    const p1 = new Point(200, 20, 20);
    const p2 = new Point(40, 200, 10);
    const p3 = new Point(10, 40, 200);
    const expected = 59;
    // ACT
    const result = Point.angleBetween(p1, p2, p3).toDegrees();
    // ASSERT
    expect(expected).to.equal(Math.round(result));
    done();
}