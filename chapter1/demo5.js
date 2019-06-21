// 求最大公约数
// 迭代的过程
function Gcd(a, b) {
  if (b === 0) return a;
  return Gcd(b, a % b);
}

console.log(Gcd(80, 20))

// 素数的求值方法

