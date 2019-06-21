// 求幂
// 递归
let traces = 0;

function expt(a, n) {
  ++traces;
  if (n === 0) return 1;
  return a * expt(a, n-1); 
}

// 迭代
function expti(a, n) {
  function iter(res, count, total) {
    if (count === total) return res;
    return iter(a*res, ++count, total);
  }
  return iter(1, 0, n);
}

console.log(expt(2,1000));
console.log(traces);

// 快速求幂
// 递归
function square(a) {
  return a * a;
}
let trace = 0;
function fastExpt(a, n) {
  ++trace;
  if (n === 0) return 1;
  return n % 2 === 0 
    ? square(fastExpt(a, n/2))
    : a * fastExpt(a, n-1)
}

console.log(fastExpt(2,1000))
console.log(trace)

// 练习1.16
// 迭代
function fastExpti(a, n) {
  function iter(a, n, res) {
    if (n === 0)  return res;
    if (n % 2 === 0) return iter(square(a), n / 2, res);
    if (n % 2 === 1) return iter(a, n - 1, a * res);
  }
  return iter(a, n, 1)
}

console.log(fastExpti(2,0))

// 练习1.17
// 递归
function product(a, b) {
  if (b === 0) {
    return 0;
  }
  return a + product(a, b - 1);
}

//  迭代
function producti(a, b) {
  function iter(res, count, base) {
    if (count === b) return res;
    return iter( res + base, ++count, base);
  }
  return iter(0, 0, a);
}

// 快速递归

function double(x) {
  return x + x;
}

function fastProduct(a, b) {
  if (b === 0) return 0;
  return b % 2 === 0
    ? double(fastProduct(a, b/2))
    : a + fastProduct(a, b-1)
}

console.log(fastProduct(3,2));