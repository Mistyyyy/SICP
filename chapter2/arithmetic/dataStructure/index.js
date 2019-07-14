const { Int } = require('./int');
const { Rational } = require('./rational');
const { Certesian } = require('./complex/certesian');
const { Polor } = require('./complex/polor');
const { Complex } = require('./complex');
const { register } = require('../store/register');

register(Int, Rational, Certesian, Complex);

