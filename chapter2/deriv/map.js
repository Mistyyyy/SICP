const { deriv } = require('./index.js');
const { addend, augend } = require('./util');

const map = new Map();

map.set('deriv', {
  add(operands, vari) {
    const { add } = map.get('normal');
    return add(
      deriv(addend(operands), vari),
      deriv(augend(operands), vari)
    );
  },
  sub(operands, vari) {
    const { sub } = map.get('normal');
    return sub(
      deriv(addend(operands), vari),
      deriv(augend(operands), vari)
    );
  },
  mul(operands, vari) {
    const { add, mul } = map.get('normal');
    return add(
      mul(addend(operands), deriv(augend(operands), vari)),
      mul(augend(operands), deriv(addend(operands), vari)),
    );
  },
  div(operands, vari) {
    const { div, add, mul } = map.get('normal');
    const first = addend(operands);
    const second = augend(operands);

    return div(
      sub(
        mul(deriv(first), second),
        mul(first, deriv(second))
      ),
      mul(second, second)
    )
  }
})

map.set('normal', {
  add(first, second) {
    return ['add', [first, second]];
  },
  sub(first, second) {
    return ['sub', [first, second]];
  },
  mul(first, second) {
    return ['mul', [first, second]];
  },
  div(first, second) {
    return ['div', [first, second]];
  }
})



module.exports = {
  map
}