/** 
 * 下面实现一种用于运算的通用型操作的系统
 * 
 * 1. 该系统可以实现 实数，有理数，复数的四则运算
*/

const { number} = require('./ds/number');
const { rational } = require('./ds/rational');
const { makeComplexFromRealImag, makeComplexFromMagAng } = require('./ds/complex');
const { map } = require('./map');
const { typeTag } = require('./util');

function add(x, y) {
  const firstTag = typeTag(x);
  const secondTag = typeTag(y);
  const target = map.get(firstTag);
  return target.add(x, y);
}

function sub(x, y) {
  const firstTag = typeTag(x);
  const secondTag = typeTag(y);
  const target = map.get(firstTag);
  return target.sub(x, y);
}

function mul(x, y) {
  const firstTag = typeTag(x);
  const secondTag = typeTag(y);
  const target = map.get(firstTag);
  return target.mul(x, y);
}

function div(x, y) {
  const firstTag = typeTag(x);
  const secondTag = typeTag(y);
  const target = map.get(firstTag);
  return target.div(x, y);
}

function equ(x, y) {
  const firstTag = typeTag(x);
  const secondTag = typeTag(y);
  const target = map.get(firstTag);
  return firstTag === secondTag
    ? target.equ(x, y)
    : false
}

function equZero(x) {
  const tag = typeTag(x);
  const target = map.get(tag);
  return target.equZero(x); 
}

module.exports = {
  add,
  sub,
  mul,
  div,
  makeComplexFromRealImag,
  makeComplexFromMagAng,
  number,
  rational,
  equ,
  equZero
}