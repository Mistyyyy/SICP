const DS = require('../store');
const { assert } = require('./assert');

function checkIsExist(...args) {
  const keys = [...DS.keys()];
  for (const item of args) {
    assert(typeof item === 'object', `The args ${item} must be a defined type of ${JSON.stringify(keys)}, which is not allow to use primative type`);
    const csName = item.constructor.name;
    assert(keys.includes(csName), `The argument ${JSON.stringify(item)} is ${csName} type, which is not defined, please check it`)
  }
}

module.exports = {
  checkIsExist
}