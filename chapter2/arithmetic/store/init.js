const DS = require('./container');
const { assert } = require('../util/assert');
const { raiseFromOriginTo } = require('./raise');

const Int = DS.get('Int');
const Rational = DS.get('Rational');
const Certesian = DS.get('Certesian');
const Complex = DS.get('Complex');

raiseFromOriginTo(Int, null, Rational);
raiseFromOriginTo(Rational, Int, Certesian);
raiseFromOriginTo(Certesian, Rational, Complex);
raiseFromOriginTo(Complex, Certesian, null);
