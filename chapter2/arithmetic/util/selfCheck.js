const { assert } = require('./assert');

function checkSelf(object) {
  object.checkSelf = function(...arg) {
    for (const item of arg) {
      assert(
        item instanceof this,
        `The argument type of ${JSON.stringify(item)} is ${item.constructor.name},
        which is not ${this.name} Type, please check it`);
    }
  }
}

exports.checkSelf = checkSelf;