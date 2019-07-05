

const number = arg => Number(exp) === Number(exp); 

const variable = exp => Number(exp) !== Number(exp);

const sameVariable = (exp, vari) => {
  return exp === vari ? 1 : 0;
}

// 取运算符
const operator = exp => exp[0];

// 取要运算的项，任何需要运算的都应该是由运算符相连接的，如 ['add', [a, b]]
// 我们暂时取前缀表示法来表示运算
const operands = exp => exp[1];

// 运算符表达式的第一项
const addend = exp => exp[0];

// 运算符表达式的第二项
const augend = exp => exp[1];

module.exports = {
  number,
  variable,
  sameVariable,
  operator,
  operands,
  addend,
  augend,
}