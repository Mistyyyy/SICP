const { attchTag, contents } = require('../util');
const { map } = require('../map');

const number = function (a) {
  return attchTag('number', a);
}

map.set('number', {
  add(x, y) {
    return number(contents(x) + contents(y));
  },
  sub(x, y) {
    return number(contents(x) - contents(y));
  },
  mul(x, y) {
    return number(contents(x) * contents(y));
  },
  div(x, y) {
    return number(contents(x) / contents(y));
  }
})

module.exports = {
  number
}