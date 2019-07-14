const DS = require('./container');
const { assert } = require('../util/assert');

function register(...constructors) {
  constructors.forEach(constructor => {
    assert(typeof constructor === 'function', `The argument ${JSON.stringify(constructor)} must be an structure function`);
    const name = constructor.name;
    DS.set(name, constructor);
  })
  return DS;
}

module.exports = {
  register
}