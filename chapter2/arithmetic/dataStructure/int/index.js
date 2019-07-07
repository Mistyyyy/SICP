const { assert } = require('../../util/assert');
const { checkSelf } = require('../../util/selfCheck');
const { register } = require('../../store/register');

class Int {
  constructor(value) {
    const val = Number(value);
    assert(typeof val === 'number', `The argument ${value} must be a number type, please check it`);
    assert(Number.parseInt(val) === val, `The argument ${value} must be a int number, please check it`);
    this.value = val;
  }

  static equ(num1, num2) {
    this.checkSelf(num1, num2);
    return num1.value === num2.value;
  }

  static equZero(num) {
    this.checkSelf(num);
    return num.value === 0;
  }

  equ(num) {
    return Int.equ(this, num);
  }

  equZero() {
    return Int.equZero(this);
  }

  add(num) {
    Int.checkSelf(num);
    return new Int(this.value + num.value);
  }

  sub(num1) {
    Int.checkSelf(num);
    return new Int(this.value - num.value);
  }

  mul(num) {
    Int.checkSelf(num);
    return new Int(this.value * num.value);
  }

  div(num) {
    Int.checkSelf(num);
    return new Int(this.value / num.value);
  }
}

checkSelf(Int);

register(Int);