const { map } = require('../../map.js');
const { attchTag,  contents } = require('../../util.js');
const { makeFromRealImag, makeFromMagAng, realPart, imagPart, magnitude, angle } = require('./middle.js');

const makeComplexFromRealImag = (a, b) => attchTag('complex', makeFromRealImag(a, b));
const makeComplexFromMagAng = (a, b)  => attchTag('complex', makeFromMagAng(a, b));

map.set('complex', {
  add(a, b) {
    const x = contents(a);
    const y = contents(b);
    const real =  realPart(x) + realPart(y);
    const imag = imagPart(x) + imagPart(y);
    return makeComplexFromRealImag(real, imag);
  },
  sub(a, b) {
    const x = contents(a);
    const y = contents(b);
    return makeComplexFromRealImag(
      realPart(x) - realPart(y),
      imagPart(x) - imagPart(y)
    )
  },
  mul(a, b) {
    const x = contents(a);
    const y = contents(b);
    return makeComplexFromMagAng(
      magnitude(x) * magnitude(y),
      angle(x) + angle(y)
    )
  },
  div(a, b) {
    const x = contents(a);
    const y = contents(b);
    return makeComplexFromMagAng(
      magnitude(x) / magnitude(y),
      angle(x) - angle(y)
    )
  },
  equ(a, b) {
    const x = contents(a);
    const y = contents(b);

    return realPart(x) === realPart(y) && imagPart(x) === imagPart(y)
  },
  equZero(a) {
    const content = contents(a);
    return realPart(content) === 0 || imagPart(content) === 0
  }
});

exports.makeComplexFromRealImag = makeComplexFromRealImag ;
exports.makeComplexFromMagAng = makeComplexFromMagAng ;

