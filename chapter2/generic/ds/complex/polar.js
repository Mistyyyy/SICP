const { square, sin, atan, cos, attchTag, sqrt } = require('../../util.js');
const { complexMap } = require('./map');

complexMap.set('polar', {
  makeFromMagAng(r, a) {
    return attchTag('polar', [r, a]);
  },
  makeFromRealImag(x, y) {
    return this.makeFromMagAng(sqrt(square(x) + square(y)), atan(y, x));
  },
  realPart(z) {
    return this.magnitude(z) * cos(this.angle(z));
  },
  imagPart(z) {
    return this.magnitude(z) * sin(this.angle(z));
  },
  angle(z) {
    return z[1];
  },
  magnitude(z) {
    return z[0];
  }
})