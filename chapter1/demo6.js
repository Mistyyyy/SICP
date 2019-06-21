
// 递归
function sum(func , a, next, b) {
  if (a > b) {
    return 0
  }
  return func(a) + sum(func, next(a), next, b);
}
// 迭代
function sumi(func, a, next, b) {
  function iter(a, res, cond) {
    if (a > cond) return res;
    return iter(next(a), func(a) + res, cond);
  }
  return iter(a, 0, b);
}

// 练习 1.31
// 递归
function product(func, a, next, b) {
  if (a > b) return 1;
  return func(a) * product(func, next(a), next, b);
}
// 迭代
function producti(func, a, next, b) {
  function iter(a, res, cond) {
    if (a > cond) return res
    return iter(next(a), res * func(a), cond);
  }
  return iter(a, 1, b)
}

// 递归
function accumulate(conbiner, nullValue, func, a, next, b) {
  if (a > b) return nullValue;
  return conbiner(
    func(a),
    accumulate(conbiner, nullValue, func, next(a), next, b)
  )
}

// 迭代
function accumulatei(conbiner,  nullValue, func, a, next, b) {
  function iter(a, res, cond) {
    if (a > cond) return res;
    return iter(
      next(a),
      conbiner(a, res),
      cond
    )
  }
  return iter(a, nullValue, b)
}

// 过滤器

function filterAccumulate(conbiner, nullValue, func, a, next, b, valid) {
  if (a > b) return nullValue;
  const rest = filterAccumulate(conbiner, nullValue, func, next(a), next, b, valid);
  if (valid(a)) {
    return conbiner(
      func(a), rest
    )
  } else {
    return rest
  }
}

function filterAccumulatei(conbiner, nullValue, func, a, next, b, valid) {
  function iter(a, res, cond) {
    if (a < cond) return nullValue
    if (valid(a)) return iter(next(a), conbiner(func(a), res), cond)
    return iter(next(a), res);
  }
  return iter(a, nullValue, b);
}

const add = (a, b) => a + b;
const prod = (a, b) => a * b;

function suma(func, a, next, b) {
  return accumulate(add, 0, func, a, next, b);
}

function sumf(func, a, next, b, valid) {
  return filterAccumulate(add, 0, func, a, next, b, valid)
}

function producta(func, a, next, b) {
  return accumulate(prod, 1, func, a, next, b);
}


// 范围求和 

function inc(a) {
  return ++a;
}

function identity(a) {
  return a;
}

function cube(a) {
  return a * a * a;
}

function sumInterge(a, b) {
  return sumf((a) => a, a, (n) => ++n, b, (n) => n % 2 === 0);
}

console.log(sumInterge(0,100));

// 范围求立方和

function sumCube(a, b) {
  return sum((n) => n*n*n, a, (n) => ++n, b);
}

// console.log(sumCube(1, 10));

// function piTerm(a)  {
//   return 1 / (a * (a + 2))
// }

// function piNext(a) {
//   return a + 4;
// }

function sumPi(a, b) {
  return sum((n) => 1 / ( n * (n + 2)), a, (n) => n + 4, b);
}

// console.log(sumPi(1, 1000)*8);


function intergral(func, a, b, dx) {
  const next = x => x + dx;
  return dx * sum(func, (a + dx / 2.0), next, b);
}

console.log(intergral(cube, 0, 1, 0.001));

// 练习 1.29

// const prefix = (a, b, n) => (b - a) / n;
// const calFunc = 
// const y = (f, a, k) => f(a+k*h);
function simpson(func, a, b, n) {
  const h = (b - a) / n;
  const y = k => func(a+ k*h);
  const factor = k => {
    if (k === 0 || k === n) return 1;
    if (k % 2 === 0) return 2;
    return 4;
  }
  const term = k => factor(k) * y(k);
  const next = k => ++k;
  return n % 2 === 1
    ? new Error('n must be an odd number')
    : sum(term, a, next, b);
}

// console.log(simpson(cube, 0, 1, 1000));

// 练习 1.30
// 使用迭代过程重新定义sum

function sumi(term, a, next, b) {
  function iter(a, res, cond) {
    if (a > cond) return res;
    return iter(next(a), term(a) + res, cond);
  }
  return iter(a, 0, b);
}

function intergrali(func, a, b, dx) {
  const next = x => x + dx;
  return sumi((a) => func(a) * dx, a, next, b);
}


console.log(intergrali(cube, 0, 1, 0.001));

// 练习 1.31
// 递归
function product(func, a, next, b) {
  if (a > b) return 1;
  return func(a) * product(func, next(a), next, b);
}
// 迭代
function producti(func, a, next, b) {
  function iter(a, res, cond) {
    if (a > cond) return res
    return iter(next(a), res * func(a), cond);
  }
  return iter(a, 1, b)
}

function factroial(n) {
  return product(identity, 1, inc, n);
}

function getPi(n) {
  return 4 * product((n) => ((n-1)*(n+1))/(n*n), 3, (n) => n = n + 2, n);
}

function getIterPi(n) {
  return producti((n) => ((n-1)*(n+1))/(n*n), 3, (n) => n = n + 2, n);
}

console.log(getPi(10000));
console.log(4 * getIterPi(10000))

// 练习1.32





