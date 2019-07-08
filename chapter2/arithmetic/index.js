// 这里需要做类型判断
// 判断的依据是该系统支持了哪些数据类型，需要写入mao表中，然后读取
const { checkIsExist } = require('./util/checkIsExist');
const { raise } = require('./store/raise');

/** 
 * todo: next target: 增加类型塔，即支持不同层次之间的类型转换
 * 
 * 对于通用的算术操作，类型之间的层次可以很清晰的划分出来，比如: 整数 -> 有理数 -> 实数 -> 复数
 * 
 * 整数可以通过类型提升变成有理数, 有理数可以通过类型提升表示为实数，实数可以通过类型提升表示为复数
 * 
 * 但是，这样组成的类型的塔结构，无法通过下沉来进行回退，比如，复数有的可以表示为整数，即虚部为零，但是有的却无法表示
 * 
 * 所以，这样的情况下，我们需要对一些情况做类型限制
 * 
 * 这样做的好处在于，如果我们按照4种类型之间的转换定义转换函数的话，4种类型，两两之间做转换，那么需要定义12种方法，
 * 每增加一种结构，增加的数量会呈现指数级的增长。这显然是不合理的。
 * 
 * 如果使用这种类型提升的方法，整数只需要关心如何提升成有理数，有理数只需关系如何提升成实数类型，实数只需关系如何提升成复数类型。
 * 这样，层次结构非常明显，转换的难度也会随之下降
 * 如果新增一种类型的话，我们只需要关心该类型在这个系统种处于什么样的层次，与哪些层次之间会有转换关系，这样，程序的可加性会非常好 
 * 
 * Int raise -> Rational raise -> Scheme raise -> Complex
 * 
 * 这是提升的过程
 * 
 * Complex down -> Scheme down -> Rational down -> Int
*/



function add(num1, num2) {
  checkIsExist(num1, num2);
  const [first, second] = raise(num1, num2);
  return first.add(second);
}

function sub(num1, num2) {
  checkIsExist(num1, num2);
  const [first, second] = raise(num1, num2);
  return num1.sub(num2);
}

function mul(num1, num2) {
  checkIsExist(num1, num2);
  const [first, second] = raise(num1, num2);
  return num1.mul(num2);
}

function div(num1, num2) {
  checkIsExist(num1, num2);
  const [first, second] = raise(num1, num2);
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