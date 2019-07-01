
/** 
 * 直角坐标系的复数表示
*/

const { square, sqrt, sin, atan, cos } = require('./util.js');

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