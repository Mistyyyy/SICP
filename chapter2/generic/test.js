const { add, makeComplexFromRealImag, rational, number } = require('./index.js');

const c1 = makeComplexFromRealImag(5, 4);
const c2 = makeComplexFromRealImag(3, 1);

const r1 = rational(1, 3);
const r2 = rational(2, 3);

const n1 = number(4);
const n2 = number(5);

const com1 = add(c1, c2);
const res1 = add(r1, r2);
const num1 = add(n1, n2);

console.log(com1, res1, num1);