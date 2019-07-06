require('./polar.js');
require('./certesian.js');
const { complexMap } = require('./map.js');
const { typeTag, contents } = require('../../util.js');


exports.realPart = function(z) {
  const type = typeTag(z);
  const content = contents(z);
  const target = complexMap.get(type);

  if (target) {
    return target.realPart(content)
  }

  throw new Error('Unknow Type --- REAL PART', z)
}

exports.imagPart = function(z) {
  const type = typeTag(z);
  const content = contents(z);
  const target = complexMap.get(type);

  if (target) {
    return target.imagPart(content)
  }

  throw new Error('Unknow Type --- IMAG PART', z)
}

exports.angle = function(z) {
  const type = typeTag(z);
  const content = contents(z);
  const target = complexMap.get(type);

  if (target) {
    return target.angle(content)
  }

  throw new Error('Unknow Type --- ANGLE PART', z)
}

exports.magnitude = function(z) {
  const type = typeTag(z);
  const content = contents(z);
  const target = complexMap.get(type);

  if (target) {
    return target.magnitude(content)
  }

  throw new Error('Unknow Type --- MAGNITUDE PART', z)
}

exports.makeFromRealImag = function(z, y) {
  const target = complexMap.get('rectangular');
  return target.makeFromRealImag(z, y)
}

exports.makeFromMagAng = function(r, a) {
  const target = complexMap.get('polar');
  return target.makeFromRealImag(r, a);
}
