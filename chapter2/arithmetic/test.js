const { add, mul } = require('./index');
const DS = require('./store');
const scheme = require('./dataStructure/scheme').Scheme;
const poly = require('./dataStructure/polynomial').Poly;
const item = require('./dataStructure/polynomial/item').Item;
const { register } = require('./store/register');

register(scheme, poly, item);

const { insertAfter, down } = require('./store/raise');

console.log(DS.keys())
const Int = DS.get('Int');
const Rational = DS.get('Rational');
const Certesian = DS.get('Certesian');
const Complex = DS.get('Complex');
const Scheme = DS.get('Scheme');
const Item = DS.get('Item');
const Poly = DS.get('Poly');


insertAfter(Scheme, Rational);

const i1 = new Int(1);
const i2 = new Int(2);
const i3 = new Int(3);
const i5 = new Int(5);
const it1 = new Item([[2,i3]]);
const it2 = new Item([[1,i2]]);
const it3 = new Item([[1,i1]]);
const it4 = new Item([[0,i5]]);

const po1 = new Poly(it1, 'x');
const po2 = new Poly(it2, 'x');
const po3 = new Poly(it3, 'x');
const po4 = new Poly(it4, 'x');

const a1 = po1.add(po2);
const a2 = po3.add(po4);

// const mul1 = a1.mul(a2);

// const r1 = new Rational(i1, i2);
const r2 = new Rational(i1, i3);
const ce1 = new Certesian(3, 1);
const ce2 = new Certesian(3, -1);
const ce3 = new Certesian(10.3, 0);

const c1 = new Complex(ce1);
const c2 = new Complex(ce2);

// const res = add(a1, a2);
const res = mul(a1, a2);

console.log(res)
// const res1 = add(c1, c2);

// console.log(down(res), down(ce3))