exports.typeTag = function (datum) {
  if (paris(datum)) {
    return datum[0]
  }
  throw new Error('Bad Tagged datum --- TYPE-TAG', datum);
}

exports.contents = function(datum) {
  if (paris(datum)) {
    return datum[1];
  }
  throw new Error('Bad Tagged datum --- CONTENTS', datum)
}

exports.attchTag = function (typetag, contents) {
  return [typetag, contents];
}

exports.square = function(a) {
  return a * a;
}

function paris(datum) {
  return datum.length === 2;
}

exports.sqrt = Math.sqrt.bind(Math);

exports.atan = Math.atan.bind(Math);

exports.cos = Math.cos.bind(Math);

exports.sin = Math.sin.bind(Math);