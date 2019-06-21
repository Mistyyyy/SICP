function f(g) {
  return g(2)
}

// console.dir(f);

// f(f); 

// Error occured;

// 区间折半寻求平方根
const TOLERANCE = 0.000001;

const closeEnough = (a, b, value) => Math.abs(a-b) <= value;

function search(func, start, end) {
  const middle = (start + end) / 2;
  if (closeEnough(start, end, TOLERANCE)) {
    return middle
  }
  if (func(middle) < 0) {
    return search(func, middle, end);
  } else if (func(middle) > 0) {
    return search(func, start, middle)
  } else {
    return middle;
  }
}

function halfIntervalMethod(func, start, end) {
  if (func(start) < 0 && func(end) > 0) {
    return search(func, start, end)
  }
  if (func(start) > 0 && func(end) < 0) {
    return search(func, end, start)
  }
  return Error('Values are not of opposite sign' + a + '  '+ b);
}

// 求 pi 的近似值。该值位于 sinx = 0 在 2 和 4之间的根

const sin = Math.sin;

console.log(halfIntervalMethod(sin, 2, 4));

// 求 x#3 - 2x - 3 = 0 在 1 和 2 之间的根

console.log(halfIntervalMethod((x) => x*x*x - 2*x - 3, 1, 2))


function fixedPoint(func, guess) {
  const next = func(guess)
  console.log('--------------------------------')
  console.log('The near value is ' + next);
  if(closeEnough(next, guess, TOLERANCE)) {
    return next
  }
  return fixedPoint(func, next);
}

const cos = Math.cos;

console.info('get the cos value')

console.log(fixedPoint(cos, 1.0))

const average = (a, b) => (a + b) / 2

const averageDamp = f => x => average(x, f(x));

// function sqart(x) {
//   return fixedPoint(averageDamp(y => x/y)(1.0))
// }

// console.info('get the sqart value')

// console.log(sqart(9.0))

// 黄金分割点 是  x |-> 1 + 1/x 的不动点

console.info('get the target value')

// 练习 1.35
console.log(fixedPoint(x => 1 + 1/x, 1.0));

// 练习 1.36
console.info('get the x#x = 1000 value')
console.log(fixedPoint(x => Math.log(1000) / Math.log(x), 7.0))

// 练习 1.37
// k 项有限连分式
const getN = i => 1.0;
const getD = i => 1.0;

// 递归
function contFrace(n, d, k) {
  if (k === 1) return n(k) / d(k)
  return n(k) / (d(k) + contFrace(n, d, --k))
}
// 迭代
function contFracei(n, d, k) {
  function iter(res, i) {
    if (i === 1) return res
    return iter(n(i-1) / (d(i-1) + res), --i)
  }
  return iter(1, k)
}

function goldenRatio(k) {
  return 1 + contFrace(getN, getD, k);
}

console.log(goldenRatio(11))

// 练习1.38

const getEn = i => 1;
const getEd = i => {
  if (i % 3 === 0) return (i/3)*2;
  return 1;
}

function getEratio(k) {
  return 2 + contFracei(getEn, getEd, k)
}

console.log(getEratio(30));

module.exports = {
  fixedPoint,
}