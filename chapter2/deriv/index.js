
const { number, variable, sameVariable, operator, operands } = require('./util.js');
const { map } = require('./map.js');

function deriv(exp, vari) {
  if (number(exp)) return 0;
  if (variable(exp)) {
    return sameVariable(exp, vari);
  }
  const symbol = operator(exp);
  const operands = operands(exp);

  const derivMap = map.get('deriv');
  // return map.get(symbol) && map.get(symbol)(operands, vari);
  return derivMap && derivMap[symbol](operands, vari);
}

module.exports = {
  deriv,
}