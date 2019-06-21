// 线性递归

function factorial(n) {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n-1);
}

// console.log(factorial(7))

function factorialIter(n) {
  function iter(product, counter, max_count) {
    if (counter <= max_count) {
      return iter(product * counter, ++counter, max_count);
    }
    return product
  }
  return iter(1,1,n)
}

// console.log(factorialIter(7));


// 练习 1.9
// 分别用递归和迭代定义两数相加的过程

// Aid 方法 辅助

function inc(a) {
  return ++a;
}

function dec(a) {
  return --a;
}

// 递归
function add(a, b) {
  if (a === 0) {
    return b;
  }
  // 根据 a 的值确定函数执行步长。
  return inc(add(dec(a), b));
}

function addi(a, b) {
  if (a === 0) return b;
  return add(dec(a), inc(b));
}

add(5,2);

// 练习 1.10

// 分析 ackermannn 函数的执行过程
let trace = 0;
function ackermannn(a, b) {
  ++trace;
  if (b === 0) return 0
  if (a === 0) return b * 2;
  if (b === 1) return 2;
  return ackermannn(a -1, ackermannn(a, b - 1));
}
console.log(ackermannn(2, 4));
console.log(trace);


module.exports = {
  factorialIter
}


