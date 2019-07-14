// 有理数的分子分母
// 可以表达为两个整数比的数(a/b b !== 0)被定义为有理数
const { assert } = require('../../util/assert');
const { gcd } = require('../../util/gcd');
const { checkSelf } = require('../../util/selfCheck');


class Rational {
  constructor(numer, demon) {
    const Int = require('../../store/container').get('Int');
    if (!demon) {
      demon  = new Int(1);
    }
    assert(numer instanceof Int, `The argument ${numer} must be an Int Type, please check it`);
    assert(demon instanceof Int, `The argument ${demon} must be an Int Type, please check it`);
    assert(demon.value !== 0, `The argument ${demon} cant not be zero, please check it`);
    const gcds = gcd(numer.value, demon.value);
    this.numer = numer.value / gcds;
    this.demon = demon.value / gcds;
  }

  add(rational) {
    const Int = require('../../store/container').get('Int');

    Rational.checkSelf(rational);
    const numers = this.numer * rational.demon + this.demon * rational.numer;
    const demons = this.demon * rational.demon;
    const gcds = gcd(numers, demons);
    const numer = new Int(numers / gcds);
    const demon = new Int(demons / gcds);
    return new Rational(numer, demon);
  }

  sub(rational) {
    const Int = require('../../store/container').get('Int');

    Rational.checkSelf(rational);
    const numers = this.numer * rational.demon - this.demon * rational.numer;
    const demons = this.demon * rational.demon;
    const gcds = gcd(numers, demons);
    const numer = new Int(numers / gcds);
    const demon = new Int(demons / gcds);
    return new Rational(numer, demon);
  }

  mul(rational) {
    const Int = require('../../store/container').get('Int');

    Rational.checkSelf(rational);
    const numers = this.numer * rational.numer
    const demons = this.demon * rational.demon
    const gcds = gcd(numers, demons);
    const numer = new Int(numers / gcds);
    const demon = new Int(demons / gcds);
    return new Rational(numer, demon);
  }

  div(rational) {
    const Int = require('../../store/container').get('Int');

    Rational.checkSelf(rational);
    const numers = this.numer * rational.demon;
    const demons = this.demon * rational.numer;
    const gcds = gcd(numers, demons);
    const numer = new Int(numers / gcds);
    const demon = new Int(demons / gcds);
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

  down() {
    if (this.demon === 1)  {
      return [this.numer];
    } else {
      return false;
    }
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

module.exports = {
  Rational
}