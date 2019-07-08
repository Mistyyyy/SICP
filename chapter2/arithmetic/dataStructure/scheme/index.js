const { assert } = require('../../util/assert');
const { checkSelf } = require('../../util/selfCheck');
const { register } = require('../../store/register');

class Scheme {
  constructor(value) {
    const val = Number(value);
    assert(typeof val === 'number', `The argument ${value} must be a number type, please check it`);
    this.value = val
  }

  static equ(num1, num2) {
    this.checkSelf(num1, num2);
    return num1.value === num2.value;
  }

  static equZero(num) {
    this.checkSelf(num);
    return num.value === 0;
  }

  static take(values) {
    const [first, second] = values;

    if (second === undefined) {
      return new Scheme(first);
    } else {
      return new Scheme((first / second));
    }
  } 

  raise() {
    return [this.value];
  }

  equ(num) {
    return Scheme.equ(this, num);
  }

  equZero() {
    return Scheme.equZero(this);
  }

  add(num) {
    Scheme.checkSelf(num);
    return new Scheme(this.value + num.value);
  }

  sub(num) {
    Scheme.checkSelf(num);
    return new Scheme(this.value - num.value);
  }

  mul(num) {
    Scheme.checkSelf(num);
    return new Scheme(this.value * num.value);
  }

  div(num) {
    Scheme.checkSelf(num);
    return new Scheme(this.value / num.value);
  }
}

checkSelf(Scheme);
register(Scheme);