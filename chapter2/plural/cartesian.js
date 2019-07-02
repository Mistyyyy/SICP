
/** 
 * 直角坐标系的复数表示
*/

const { square, sqrt, sin, atan, cos, attchTag } = require('./util.js');
// 实部
function realPart(z) {
  return z[0];
}

// 虚部
function imagPart(z) {
  return z[1];
}

// 模
function magnitude(z) {
  return sqrt(
    square(realPart(z)) + square(imagPart(z))
  )
}

// 夹角

function angle(z) {
  return atan(
    imagPart(z),
    realPart(z)
  )
}

function makeFromRealImag(x, y) {
  return [x, y];
}

function makeFromMagAng(r, a) {
  return makeFromRealImag(r * cos(a), r * sin(a))
}

function realPartRectangular(z) {
  return z[0]
}

function imagPartRectangular(z) {
  return z[1]
}

function magnitudeRectangular(z) {
  return sqrt(
    square(realPartRectangular(z)) + square(imagPartRectangular(z))
  )
}

function angleRectangular(z) {
  return atan(
    imagPartRectangular(z),
    realPartRectangular(z)
  )
}

function makeFromRealImagRectangular(x, y) {
  return attchTag('rectangular', [x, y]);
}

function makeFromMagAngRectangular(r, a) {
  return makeFromRealImagRectangular(r * cos(a), r * sin(a))
}

module.exports = {
  realPart,
  realPartRectangular,
  imagPart,
  imagPartRectangular,
  magnitude,
  magnitudeRectangular,
  angle,
  angleRectangular,
  makeFromRealImag,
  makeFromRealImagRectangular,
  makeFromMagAng,
  makeFromMagAngRectangular,
}