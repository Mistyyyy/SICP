function warn(condition, warnMsg = 'warn') {
  if (!condition) {
    console.warn(warnMsg);
  }
}

exports.warn = warn;