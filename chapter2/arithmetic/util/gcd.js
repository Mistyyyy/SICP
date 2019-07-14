function gcd(a, b) {
  if (a % b === 0) {
    return b
  }

  if (b === 1) {
    return false;
  }

  return gcd(b, a-b);
}