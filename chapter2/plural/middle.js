const { rectangular, polar } = require('./util');
const { realPartRectangular, imagPartRectangular, magnitudeRectangular, angleRectangular, makeFromRealImagRectangular } = require('./cartesian.js');
const { realPartPolar, imagPartPolar, magnitudePolar, anglePolar, makeFromMagAngPolar } = require('./polar');

exports.realPart = function(z) {
  return rectangular(z)
    ? realPartRectangular(z)
    : polar(z)
      ? realPartPolar(z)
      : null;
  throw new Error('Unknow Type --- REAL PART', z)
} 

exports.imagPart = function(z) {
  return rectangular(z)
    ? imagPartRectangular(z)
    : polar(z)
      ? imagPartPolar(z)
      : null;
  throw new Error('Unknow Type --- IMAG PART', z)
} 

exports.magnitude = function(z) {
  return rectangular(z)
    ? magnitudeRectangular(z)
    : polar(z)
      ? magnitudePolar(z)
      : null;
  throw new Error('Unknow Type --- MAGNITUDE', z)
} 

exports.angle = function(z) {
  return rectangular(z)
    ? angleRectangular(z)
    : polar(z)
      ? anglePolar(z)
      : null;
  throw new Error('Unknow Type --- ANGLE', z)
} 

exports.makeFromRealImag = function(x, y) {
  return makeFromRealImagRectangular(x, y)
}

exports.makeFromMagAng = function(r, degree) {
  return makeFromMagAngPolar(r, degree);
}