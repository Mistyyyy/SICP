const { fixedPoint } = require('./demo7.js');

const TOLERANCE = 0.00001;
const dx = TOLERANCE;

function cube(x) {
  return x*x*x;
}

function square(x) {
  return x * x;
}


function derve(g) {
  return x => (g(x + dx) - g(x)) / dx
}

console.log(derve(cube)(5))

// 牛顿法求不定点的过程

function newtonTransform(g) {
  return x => x - g(x)/derve(g)(x);
}

function newtonMethods(g, guess) {
  return fixedPoint(newtonTransform(g), guess);
}

function sqrt(x) {
  return newtonMethods(y => y*y - x, 1.0)
}
 
console.log(sqrt(5))

// 进一步抽象寻找不动点的过程

function fixedPointOfTransform (g, transform, guess = 1.0) {
  return fixedPoint(transform(g), guess);
}

// 牛顿法
function sqrt(x) {
  return fixedPointOfTransform(y => y*y - x, newtonTransform)
}

console.log(sqrt(5))

// 平均阻尼的方式来求不动点
const sum = (...arg) => arg.reduce((p, a) => p + a)
const average = (...arg) => sum(arg) / arg.length

const averageDamp = f => x => average(x, f(x));

function sqrat(x) {
  return fixedPointOfTransform(y => x/y, averageDamp)
}

console.log(sqrat(5))

// 练习 1.40

function cubes(a, b, c) {
  return x => cube(x) + b * square(x) + c * x + c;
}

function cubeFunction(a, b, c) {
  return newtonMethods(cubes(a, b, c), 1)
}


function cubesFunction(a, b, c) {
  return fixedPointOfTransform(cubes(a, b, c), newtonTransform)
}

console.log(cubeFunction(2,2,2))
console.log(cubesFunction(2,2,2))

// 练习 1.41
function inc(x) {
  return ++x;
}

function double(g) {
  return x => g(g(x))
}

// double(double) => || fd: x => double(double(x)) 
// double(double(double)) => || ft: x => fd(fd(x))
// double(double(double))(inc) => || fd(fd(inc))
// fd(inc) => || double(double(inc))
// 

const temp = double(double(double))(inc);

console.log(temp(5))

// 练习 1.42

function compose(...arg) {
  return arg.reduceRight((prev, cur) => (...args) => cur(prev(...args)))
}

const tpm = compose(square, inc)

console.log(tpm(6));

// 练习 1.43

function repeat(func, n) {
  return x => {
    if ( n > 0) {
      return repeat(func, --n)(func(x));
    }
    return x
  }
}

const sqtmp = repeat(square, 3);
console.log(sqtmp(5))

// 练习 1.44

function smooth(f) {
  return x => average(f(x-dx), f(x), f(x+dx))
}

const rSmooth = repeat(smooth, n);

// 练习 1.45

// 练习 1.46


