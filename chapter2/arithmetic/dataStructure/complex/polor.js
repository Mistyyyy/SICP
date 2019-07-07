const { cos, sin } = require('../../util/math');
const { map } = require('./map');
const { register } = require('../../store/register');

class Polor {
  constructor([magnitude, angle]) {
    this.magnitude = magnitude;
    this.angle = angle;
    this.imagPart = this.magnitude * cos(this.angle);
    this.imagPart = this.magnitude * sin(this.angle);
  }
}

map.set('Polor', Polor);
register(Polor);