function square(x) {
  return x * x;
}

function cubeduct(x) {
  return x * x * x;
}

function abs(a, b) {
  const res = a -b;
  return res >= 0 ? res : -res;
}

function average(a, b) {
  return (a + b) / 2; 
}

function sum(a, b) {
  return a + b;
}

function divide(a, b) {
  return a / b;
}

function sqrt(x) {
  function isGoodEnough(guess, x) {
    if (abs(square(guess), x) < 0.001) {
      return true;
    }
    return false;
  }

  function improve(guess, x) {
    return average(guess, x/guess);
  }

  function sqrtIter(guess, x) {
    return isGoodEnough(guess, x)
      ? guess
      : sqrtIter(improve(guess, x), x)
  }

  return sqrtIter(1.0, x);
}

console.log(sqrt(2));

function cube(x) {
  function isGoodEnough(guess, x) {
    if (abs(cubeduct(guess), x) < 0.001) {
      return true;
    }
    return false;
  }

  function improve(guess, x) {
    return sum(divide(x, square(guess)), guess * 2) / 3;
  }

  function cubeIter(guess, x) {
    return isGoodEnough(guess, x)
      ? guess
      : cubeIter(improve(guess, x), x)
  }

  return cubeIter(1.0, x);
}

console.log(cube(27))