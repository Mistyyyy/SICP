const { attchTag, contents } = require('../util');
const { map } = require('../map');

// define rat structure
function makeRat(x, y) {
  return [x, y];
}

// 分子
function numer(x) {
  return x[0];
}

// 分母
function denom(x) {
  return x[1];
}

function addRat(x, y) {
  return makeRat(
    numer(x) * denom(y) + numer(y) * denom(x), 
    denom(x) * denom(y)
  );
}

function subRat(x, y) {
  return makeRat(
    numer(x) * denom(y) - numer(y) * denom(x), 
    denom(x) * denom(y)
  );
}

function mulRat(x, y) {
  return makeRat(
    numer(x) * numer(y),
    denom(x) * denom(y)
  );
}

function divRat(x, y) {
  return makeRat(
    numer(x) * denom(y),
    numer(y) * denom(x)
  );
}

exports.rational = function (a, b) {
  return attchTag('rational', makeRat(a, b));
}

map.set('rational', {
  add(x, y) {
    return attchTag(
      'rational',
      addRat(contents(x), contents(y))
    );
  },
  sub(x, y) {
    return attchTag(
      'rational',
      subRat(contents(x), contents(y))
    );
  },
  mul(x, y) {
    return attchTag(
      'rational',
      mulRat(contents(x), contents(y))
    );
  },
  div(x, y) {
    return attchTag(
      'rational',
      divRat(contents(x), contents(y))
    );
  },
  equ(x, y) {
    const firstContent = contents(x);
    const secondContent = contents(y);
    return (numer(firstContent) / denom(firstContent)) === (numer(secondContent) / denom(secondContent))
  },
  equZero(x) {
    const content = contents(x);
    return numer(content) === 0 || denom(content) === 0
  }
})