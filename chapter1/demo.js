
// 求三个数中的较大两个值的和

function larger(a, b) {
  return a >= b ? a : b;
}

function smaller(a, b) {
  return a <= b ? a : b; 
}

function twoSum(a, b) {
  return a + b;
}

function largerTwoSum (a, b, c) {
  return twoSum(larger(a, b), larger(smaller(a, b), c));
}

// 采用以下方法可以检测解释器以何种方式进行求值

function f() {
  f();
}

function test(a, b) {
  if (a === 0) {
    return a;
  }
  return b;
}

test(0, f());

