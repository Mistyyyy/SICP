const { add, makeComplexFromRealImag, rational, number, equ, equZero } = require('./index.js');

const c1 = makeComplexFromRealImag(5, 4);
const c2 = makeComplexFromRealImag(3, 1);
const c3 = makeComplexFromRealImag(3, 1);
const c4 = makeComplexFromRealImag(0, 1);
const c5 = makeComplexFromRealImag(1, 0);


const r1 = rational(1, 3);
const r2 = rational(2, 3);
const r3 = rational(2, 3);
const r4 = rational(0, 3);
const r5 = rational(2, 0);



const n1 = number(4);
const n2 = number(5);
const n3 = number(4);
const n4 = number(0);


const com1 = add(c1, c2);
const res1 = add(r1, r2);
const num1 = add(n1, n2);

console.log(com1, res1, num1, equ(c2, c3), equ(c1, n3), equ(r1,  r3), equZero(c4), equZero(c5), equZero(r5), equZero(r4), equZero(n4));