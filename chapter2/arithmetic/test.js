const { add } = require('./index');
const DS = require('./store');
require('./dataStructure/scheme');

const Int = DS.get('Int');
const Rational = DS.get('Rational');
const Certesian = DS.get('Certesian');
const Complex = DS.get('Complex');

const i1 = new Int(1);
const i2 = new Int(2);
const i3 = new Int(3);

const r1 = new Rational(i1, i2);
const r2 = new Rational(i1, i3);
const ce1 = new Certesian(3, 1);
const ce2 = new Certesian(3, 2);
const ce3 = new Certesian(10, 1);

console.log(ce1)

const c1 = new Complex(ce1);
const c2 = new Complex(ce2);
// const c3 = new Complex(ce3);

console.log(c1)

const res = add(c1, c2);

// console.log(res)