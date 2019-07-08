const { add } = require('./index');
const DS = require('./store');
require('./dataStructure/scheme');
const { insertAfter } = require('./store/raise');

const Int = DS.get('Int');
const Rational = DS.get('Rational');
const Certesian = DS.get('Certesian');
const Complex = DS.get('Complex');
const Scheme = DS.get('Scheme');

insertAfter(Scheme, Rational);

const i1 = new Int(1);
const i2 = new Int(2);
const i3 = new Int(3);

const r1 = new Rational(i1, i2);
const r2 = new Rational(i1, i3);
const ce1 = new Certesian(3, 1);
const ce2 = new Certesian(3, -1);
const ce3 = new Certesian(10, 1);

const c1 = new Complex(ce1);
const c2 = new Complex(ce2);

const res = add(i1, c1);
const res1 = add(c1, c2);
console.log(res1)