const { square, sqrt, sin, atan, cos, attchTag } = require('../../util.js');
const { complexMap } = require('./map');

complexMap.set('rectangular', {
  makeFromRealImag(x, y) {
    return attchTag('rectangular', [x, y]);
  },
  makeFromMagAng(r, a) {
    return this.makeFromRealImag(r * cos(a), r * sin(a));
  },
  realPart(z) {
    return z[0];
  },
  imagPart(z) {
    return z[1];
  },
  angle(z) {
    return atan(
      this.imagPart(z),
      this.realPart(z)
    )
  },
  magnitude(z) {
    return sqrt(
      square(this.realPart(z)) + square(this.imagPart(z))
    )
  }
})