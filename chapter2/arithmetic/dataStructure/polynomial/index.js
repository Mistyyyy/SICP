/** 
 * 描述一个数据结构开始之前，我们需要明确的是该数据结构由哪些部分组成
 * 
 * 他们包含的操作有哪些，
 * 
 * 多项式，顾名思义，有很多项组成，项之间可以通过加减乘除这几类操作组合
 * 此外，一个重要的特性就是 多项式通常总是针对某些特定的变量，为了方便，暂时只考虑一元的情况
 * 
 * 我们再看看项，项是由系数 自变量 次幂 这三个参数构成，这也是一个多项式，所以不应该做区分
*/

const { assert } = require('../../util/assert');
const { checkSelf } = require('../../util/selfCheck');

class Poly {
  constructor(term, variable) {
    this.value = [term, variable];
    this.termList = term;
    this.variable = variable;
  }

  getTerm() {
    return this.termList;
  }

  getVariable() {
    return this.variable;
  }

  add(poly) {
    Poly.isSameVariable(this, poly);

    return new Poly(
      this.termList.add(poly.termList),
      this.getVariable(),
    )
  }

  mul(poly) {
    Poly.isSameVariable(this, poly);

    return new Poly(
      this.termList.mul(poly.termList),
      this.getVariable()
    )
  }
}

Poly.isSameVariable = function(...args) {
  const initVar = args[0].getVariable();
  for (const item of args) {
    this.checkSelf(item);
    assert(item.getVariable() === initVar, `The variable in poly must be same with ${initVar} ${item.getVariable()}`)
  }
}

checkSelf(Poly);

module.exports = {
  Poly
}