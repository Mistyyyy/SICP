function assert(condition, errorMsg = 'Type Error') {
  if (!condition) {
    throw new Error(errorMsg);
  }
}

exports.assert = assert;