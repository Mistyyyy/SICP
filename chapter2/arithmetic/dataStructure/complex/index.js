const { map } = require('./map');
const { assert } = require('../../util/assert');
const { checkSelf } = require('../../util/selfCheck');
class Complex {
  constructor(complex) {
    const constructorName = complex.constructor.name;
    assert(map.get(constructorName), `The Data Structure ${constructorName} was not found in the complex Data Set, please check it`)
    this.value = complex;
    this.realPart = complex.realPart;
    this.imagPart = complex.imagPart;
    this.magnitude = complex.magnitude;
    this.angle = complex.angle;
  }

  add(complex) {
    Complex.checkSelf(complex);
    const Certesian = require('../../store').get('Certesian');
    console.log(this.imagPart, complex.imagPart);
    return new Complex(new Certesian(this.realPart + complex.realPart, this.imagPart + complex.imagPart));
  }

  sub(complex) {
    Complex.checkSelf(complex);
    const Certesian = require('../../store').get('Certesian');
    return new Complex(new Certesian(this.realPart - complex.realPart, this.imagPart - complex.imagPart));
  }

  mul(complex) {
    Complex.checkSelf(complex);
    const Polor = require('../../store/container').get('Polor');
    return new Complex(new Polor(this.magnitude * complex.magnitude, this.angle * complex.angle));
  }

  div(complex) {
    Complex.checkSelf(complex);
    const Polor = require('../../store/container').get('Polor');
    return new Complex(new Polor((this.magnitude / complex.magnitude), (this.angle / complex.angle)));
  }

  equ(complex) {
    return Complex.equ(this, complex);
  }

  equZero() {
    return Complex.equZero(this);
  }

  down() {
    if (this.imagPart === 0) {
      return [this.realPart, this.imagPart];
    } else {
      return false;
    }
  }

  static equ(complex1, complex2) {
    this.checkSelf(complex1, complex2);
    return complex1.realPart === complex2.realPart && complex1.imagPart === complex2.imagPart;
  }

  static equZero(complex) {
    this.checkSelf(complex);
    return complex.realPart === 0;
  }

  static take(value) {
    return new Complex(value);
  }
}

checkSelf(Complex);

module.exports = {
  Complex
}