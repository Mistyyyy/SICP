// 2.1.4 扩展练习 区间算数

// 区间的数据结构的抽象
// 练习 2.7
function MakeInterval(a, b) {
  this.data = [Math.min(a, b), Math.max(a, b)];
}

MakeInterval.prototype.head = function() {
  return this.data[0];
}

MakeInterval.prototype.tail = function() {
  return this.data[this.data.length - 1];
}

function upperBound(a) {
  return a.tail();
}

function lowerBound(a) {
  return a.head();
}

function addInterval(x, y) {
  return new MakeInterval(lowerBound(x) + lowerBound(y), upperBound(x) + upperBound(y)); 
}

// 练习 2.8
function subInterval(x, y) {
  const min = Math.min(lowerBound(x) - upperBound(y), lowerBound(y) - upperBound(x));
  const max = Math.max(upperBound(x) - lowerBound(y), upperBound(y) - lowerBound(x));
  return new MakeInterval(min, max);
}

function mulInterval(x, y) {
  const p1 = lowerBound(x) * lowerBound(y);
  const p2 = lowerBound(x) * upperBound(y);
  const p3 = upperBound(x) * lowerBound(y);
  const p4 = upperBound(x) * upperBound(y);
  return new MakeInterval(Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4));
}

// 练习 2.11

function mulInterval(x, y) {
  let min, max;
  if (y.head() >= 0) {
    if (x.head() >= 0) 
      min = lowerBound(x) * lowerBound(y), max = upperBound(x) * upperBound(y);
    if (x.head() <= 0 && x.tail() >= 0)
      min = lowerBound(x) * upperBound(y), max = upperBound(x) * upperBound(y);
    if (x.tail() <= 0)
      min = lowerBound(x) * upperBound(y), max = upperBound(x) * lowerBound(y);
  }
  if (y.head() <= 0 && y.tail() <= 0) {
    if (x.head() >= 0) 
      min = upperBound(x) * lowerBound(y), max = lowerBound(x) * upperBound(y);
    if (x.head() <= 0 && x.tail() >= 0)
      min = upperBound(x) * lowerBound(y), max = lowerBound(x) * lowerBound(y);
    if (x.tail() <= 0)
      min = upperBound(x) * upperBound(y), max = lowerBound(x) * lowerBound(y);
  }
  if (y.head() <= 0 && y.tail() >= 0) {
    if (x.head() >= 0) 
      min = upperBound(x) * lowerBound(y), max = upperBound(x) * upperBound(y);
    if (x.head() <= 0 && x.tail() >= 0)
      min = Math.min(lowerBound(x) * upperBound(y), lowerBound(y) * upperBound(x)), max = Math.max(upperBound(x) * upperBound(y), lowerBound(x) * lowerBound(y));
    if (x.tail() <= 0)
      min = lowerBound(x) * upperBound(y), max = lowerBound(x) * lowerBound(y);
  }
  return new MakeInterval(min, max);
}

// 练习 2.10
function divInterval(x, y) {
  if (x.head() * x.tail() < 0 || y.head() * y.tail() < 0) {
    throw new Error('The Interval can\'t cross the zero range if you do the divide job');
  }
  return mulInterval(x, new MakeInterval(1/lowerBound(y), 1/upperBound(y)));
}

// 练习 2.12

function MakeCenterPercent(mid, per) {
  return new MakeInterval(mid - mid * per, mid + mid * per);
}

function center(i) {
  return (lowerBound(i) + upperBound(i)) / 2;
}

function width(i) {
  return (upperBound(i) - lowerBound(i)) / 2;
}

function percent(i) {
  return width(i) / center(i);
}

// 练习 2.13

const A = MakeCenterPercent(10,0.001);
const B = MakeCenterPercent(19,0.001);

// 电阻的计算

const part1 = function(p1, p2) {
  return divInterval(
    mulInterval(p1, p2),
    addInterval(p1, p2)
  )
}

const part2 = function(p1, p2) {
  return divInterval(
    new MakeInterval(1, 1),
    addInterval(
      divInterval(
        new MakeInterval(1, 1),
        p1,
      ),
      divInterval(
        new MakeInterval(1, 1),
        p2,
      ),
    )
  )
}
console.log(part1(A, B), part2(A, B));