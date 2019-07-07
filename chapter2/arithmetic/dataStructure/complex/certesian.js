const { atan, sqrt, square } = require('../../util/math');
const { map } = require('./map');
const { register } = require('../../store/register');


class Certesian {
  constructor(realPart, imagPart) {
    this.realPart = realPart;
    this.imagPart = imagPart;
    this.magnitude = sqrt(square(this.realPart) + square(this.imagPart));
    this.angle = atan(this.imagPart, this.realPart) 
  }
}

map.set('Certesian', Certesian);
register(Certesian);