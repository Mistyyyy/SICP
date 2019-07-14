function gcd(a, b) {
  if (a < 0) a = -a;
  if (b < 0) b = -b;
  if (a < b) [a, b] = [b,a]
 
  return a % b === 0
    ? b
    : b === 1
      ? 1
      : gcd(b, a-b);
}


module.exports = {
  gcd
}