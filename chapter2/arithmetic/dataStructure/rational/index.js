// 有理数的分子分母
// 可以表达为两个整数比的数(a/b b !== 0)被定义为有理数
const Int = require('../../store/container').get('Int');
const { assert } = require('../../util/assert');
const { checkSelf } = require('../../util/selfCheck');
const { register } = require('../../store/register');

class Rational {
  constructor(numer, demon = new Int(1)) {
    assert(numer instanceof Int, `The argument ${numer} must be an Int Type, please check it`);
    assert(demon instanceof Int, `The argument ${demon} must be an Int Type, please check it`);
    assert(demon.value !== 0, `The argument ${demon} cant not be zero, please check it`);
    this.numer = numer.value;
    this.demon = demon.value;
  }

  add(rational) {
    Rational.checkSelf(rational);
    const numer = new Int(this.numer * rational.demon + this.demon * rational.numer);
    const demon = new Int(this.demon * rational.demon);
    return new Rational(numer, demon);
  }

  sub(rational) {
    Rational.checkSelf(rational);
    const numer = new Int(this.numer * rational.demon - this.demon * rational.numer);
    const demon = new Int(this.demon * rational.demon);
    return new Rational(numer, demon);
  }

  mul(rational) {
    Rational.checkSelf(rational);
    const numer = new Int(this.numer * rational.numer);
    const demon = new Int(this.demon * rational.demon);
    return new Rational(numer, demon);
  }

  div(rational) {
    Rational.checkSelf(rational);
    const numer = new Int(this.numer * rational.demon);
    const demon = new Int(this.demon * rational.numer);
    return new Rational(numer, demon);
  }

  equ(rational) {
    return Rational.equ(this, rational);
  }

  equZero() {
    return Rational.equZero(this);
  }

  raise() {
    return [this.numer, this.demon];
  }

  static equ(rational1, rational2) {
    this.checkSelf(rational1, rational2);
    const res = rational1.div(rational2);
    return (res.numer / res.demon) === 1;
  }

  static equZero(rational) {
    this.checkSelf(rational);
    return rational.numer === 0;
  }

  static take(values) {
    const [first, second = 1] = values;
    return new Rational(new Int(first), new Int(second));
  }
}

checkSelf(Rational);

register(Rational);