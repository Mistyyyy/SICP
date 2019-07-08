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

  static take(values) {
    const [realPart, imagPart = 0] = values;
    return new Certesian(realPart, imagPart);
  }

  raise() {
    return this;
  }
}

map.set('Certesian', Certesian);
register(Certesian);