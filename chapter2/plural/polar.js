
/** 
 * 极坐标系的复数表示
*/
const { map } = require('./map.js');
const { square, sin, atan, cos, attchTag } = require('./util.js');

// 实部
function realPart(z) {
  return magnitude(z) * cos(angle(z));
}

// 虚部
function imagPart(z) {
  return magnitude(z) * sin(angle(z));
}

// 模
function magnitude(z) {
  return z[0]
}

// 夹角
function angle(z) {
  return z[1]
}

function makeFromMagAng(r, a) {
  return [r, a];
}

function makeFromRealImag(x, y) {
  return makeFromMagAng(sqrt(square(z) + square(y)), atan(y, x))
}

function realPartPolar(z) {
  return magnitudePolar(z) * cos(anglePolar(z));
}

// 虚部
function imagPartPolar(z) {
  return magnitudePolar(z) * sin(anglePolar(z));
}

// 模
function magnitudePolar(z) {
  return z[0]
}

// 夹角
function anglePolar(z) {
  return z[1]
}

function makeFromMagAngPolar(r, a) {
  return attchTag('polar', [r, a]);
}

function makeFromRealImagPolar(x, y) {
  return makeFromMagAngPolar(sqrt(square(z) + square(y)), atan(y, x))
}

map.set('polar', {
  makeFromMagAng(r, a) {
    return attchTag('polar', [r, a]);
  },
  makeFromRealImag(x, y) {
    return this.makeFromMagAng(sqrt(square(z) + square(y)), atan(y, x));
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

module.exports = {
  realPart,
  realPartPolar,
  imagPart,
  imagPartPolar,
  magnitude,
  magnitudePolar,
  angle,
  anglePolar,
  makeFromRealImag,
  makeFromMagAngPolar,
  makeFromMagAng,
  makeFromRealImagPolar,
}