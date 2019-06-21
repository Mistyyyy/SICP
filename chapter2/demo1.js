// 练习 2.2

// 构造平面上的线段表示

function sum(...a) {
  return a.reduce((p, a) => p + a);
}

function average(...a) {
  return sum(...a) / a.length;
}

function MakePoint(x, y) {
  this.data = [x, y];
  return this;
}

MakePoint.prototype.first = function() {
  return this.data[0];
}

MakePoint.prototype.tail = function() {
  return this.data[1];
}

function xPoint(point) {
  return point.first();
}

function yPoint(point) {
  return point.tail();
}

function MakeSegment(point1, point2) {
  this.data = [point1, point2]
  return this;
}

MakeSegment.prototype = {
  ...MakePoint.prototype,
  ...MakeSegment.prototype
}

function startSegment(segment) {
  return segment.first();
}

function endSegment(segment) {
  return segment.tail();
}

function midPointSegment(segment) {
  const x = average(xPoint(segment.first()), xPoint(segment.tail()));
  const y = average(yPoint(segment.first()), yPoint(segment.tail()));
  return new MakePoint(x, y);
}

const point1 = new MakePoint(1,2);
const point2 = new MakePoint(2,3);
const point3 = new MakePoint(4,5);
const segment1 = new MakeSegment(point1, point2);
const segment2 = new MakeSegment(point2, point3);

console.dir(midPointSegment(segment1, segment2));

// 实现矩形的表达方式

function RectAngle(point1, point2, point3, poin4) {
  this.data = [...arguments];
}

RectAngle.prototype.area = function() {

}

RectAngle.prototype.perimeter = function() {

}

// 序对的实现

function cons(x, y) {
  return function(m) {
    if (m === 0) return x;
    if (m === 1) return y;
    throw new Error('arguments must be 0 or 1;')
  }
}

const num = cons(1, 2);

// 分子
function car(z) {
  return z(0);
}

// 分母
function cdr(z) {
  return z(1);
}

function makeRat(a, b) {
  return cons(a, b);
}

function addRat(a, b) {
  return (car(a) * cdr(b) + cdr(a) * car(b)) / cdr(a) * cdr(b);
}

function subRat(a, b) {
  return (car(a) * cdr(b) - cdr(a) * car(b)) / cdr(a) * cdr(b);
}

function mulRat(a, b) {
  return car(a) * car(b) / cdr(a) * cdr(b);
}

function divRat(a, b) {
  return car(a) * cdr(b) / cdr(a) * car(b);
}

function equalRat(a, b) {
  return car(a) * cdr(b) === cdr(a) * car(b);
}

console.log(cdr(num))

// 练习2.4
// 序对完全由过程来表示。
const consa = (x, y) => m => m(x, y);

const cara = z => z((p, q) => p);
const cdra = z => z((p, q) => q);

const l = consa(1, 2);

console.log(cara(l), cdra(l));

// 练习2.5

function consp(a, b) {
  return Math.pow(2, a) * Math.pow(3, b)
}
// 迭代
function carp(num, count = 0) {
  if (num % 2 === 0) {
    ++count;
    return carp(num / 2, count);
  }
  return count;
}
// 递归
function carpr(num) {
  if (num % 2 !== 0) {
    return 0
  }
  return 1 + carpr(num / 2);
}

function cdrp(num, count = 0) {
  if (num % 3 === 0) {
    ++count;
    return carp(num / 3, count);
  }
  return count;
}

const p = consp(3, 4);
console.log(carp(p), cdrp(p), p);

// 练习2.6

const zero = f => x => x;
const add1 = n => f => x => f(n(f)(x));

add1(zero) // f => x => f(zero(f)(x)); -> f => x => f(x);
const one = add1(zero) // f => x => f(x)

const two = add1(one) // f => x => f(one(f)(x)); -> f => x => f(f(x));

const three = add1(two) // f => x => f(two(f)(x)); -> f => x => f(f(f(x)));

// const one = add1(zero)
// const two = f => x => f(f(x));
// const three = f => x => f(f(f(x)));
// const four = f => x => f(f(f(f(x))));

function plus(m, n) {
  return f => x => m(f)(n(f)(x))
}

const inc = a => ++a;

console.log(zero(inc)(2))
console.log(one(inc)(2))
console.log(two(inc)(2))
console.log(three(inc)(2))

console.log(plus(two, three)(inc)(3))