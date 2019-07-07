// 这里需要做类型判断
// 判断的依据是该系统支持了哪些数据类型，需要写入mao表中，然后读取
// const { map } = require('./dataStructure');
// const { assert } = require('./util/assert');
const { checkIsExist } = require('./util/checkIsExist');

function add(num1, num2) {
  checkIsExist(num1, num2);
  // const constructorName = num1.constructor.name;
  // const constructorName2 = num2.constructor.name;
  // assert(map.get(constructorName), `The Data Structure ${constructorName} was not found in the defined Data Set, please check it`)
  // assert(map.get(constructorName2), `The Data Structure ${constructorName2} was not found in the defined Data Set, please check it`)
  return num1.add(num2);
}

function sub(num1, num2) {
  checkIsExist(num1, num2);
  return num1.sub(num2);
}

function mul(num1, num2) {
  checkIsExist(num1, num2);
  return num1.mul(num2);
}

function div(num1, num2) {
  checkIsExist(num1, num2);
  return num1.div(num2);
}

function equ(num1, num2) {
  checkIsExist(num1, num2);
  return num1.equ(num2);
}

function equZero(num) {
  checkIsExist(num1, num2);
  return num.equZero();
}

module.exports = {
  add,
  sub,
  mul,
  div,
  equ,
  equZero,
}