const cartesian = require('./cartesian');
const polar = require('./polar');
const { realPart, imagPart, magnitude, angle, makeFromRealImag, makeFromMagAng } = require('./middle');

{
  function addComplex(z1, z2) {
    return cartesian.makeFromRealImag(
      cartesian.realPart(z1) + cartesian.realPart(z2),
      cartesian.imagPart(z1) + cartesian.imagPart(z2)
    )
  }

  function subComplex(z1, z2) {
    return cartesian.makeFromRealImag(
      cartesian.realPart(z1) - cartesian.realPart(z2),
      cartesian.imagPart(z1) - cartesian.imagPart(z2)
    )
  }

  function mulComplex(z1, z2) {
    return polar.makeFromMagAng(
      polar.magnitude(z1) * polar.magnitude(z2),
      polar.angle(z1) + polar.angle(z2)
    )
  }

  // 该方式和乘法一样，需要对接受参数的类型进行约束，即要是极坐标的表示，因为无法对数据类型进行判断，我们只能靠人工约束
  // 这样的设计方式很不自然，约束性太强，易出错，不易扩展，此得出的结果无法直接进行加减法，因为加减法只能接受直角坐标的表示
  // 这样，该方式进行符合表达式的运算，扩展性和实用性较差，我们希望可以设计出四则运算可以接受任意已经定义的数据结构
  // 并且，我们希望可以对数据结构进行有效的区分
  // 无法区分具体的数据结构是一件很危险的事情
  function divComplex(z1, z2) {
    return polar.makeFromMagAng(
      polar.magnitude(z1) / polar.magnitude(z2),
      polar.angle(z1) - polar.angle(z2)
    )
  }
}


/** 
 * 上述做法的缺陷在于完成了复数的计算，但是对于最终的结果，如果事先不知晓函数的实现过程，我们无法得知得出的数据
 * 到底是直角坐标表示还是极坐标形式的表示
 * 
 * 比如：一系列复杂的运算，最后得出 (3, 4) 这样的数据结构，3 和 4 是实部/虚部 还是 模/角度
*/

/** 
 * 上述做法很不灵活，如: add 和 sub 接受的参数只能是直角坐标的表示，并调用直角坐标求实部和虚部进行运算，最后得出一个直角坐标的复数形式
 * mul 和 div 也一样
 * 
 * 但是，无论是直角坐标还是极坐标的形式，我们都可以计算出实部/虚部 模/夹角，所以上述的一些限制没有任何意义。
 * 此外，如果我们得出了一个复数形式，我们必须要先确定它到底是直角坐标表示和极坐标表示，因为这两种数据格式所对应的选择函数不同。
 * 
 * 所以，为了数据的方便操作性质，我们需要对数据进行类型标注，我们可以为同一系统中同一数据格式的不同数据类型进行类型标注
 * 
 * 我们可以使用字符串作为类型标记
*/

/** 
 * 我们看一下，使用类型标注进行构建复数操作
 * 
 * 提前约定，复数的加减最终的数据表示为直角坐标系进行表示，乘除用极坐标的形式进行表示
*/

{

  function addComplex(z1, z2) {
    return makeFromRealImag(
      realPart(z1) + realPart(z2),
      imagPart(z1) + imagPart(z2)
    )
  }

  function subComplex(z1, z2) {
    return makeFromRealImag(
      realPart(z1) - realPart(z2),
      imagPart(z1) - imagPart(z2)
    )
  }

  function mulComplex(z1, z2) {
    return makeFromMagAng(
      magnitude(z1) * magnitude(z2),
      angle(z1) + angle(z2)
    )
  }

  function divComplex(z1, z2) {
    return makeFromMagAng(
      magnitude(z1) / magnitude(z2),
      angle(z1) - angle(z2)
    )
  }
}

/** 
 * 这种方式的表述已经比上面的一种表示有了很大的灵活性，程序的使用和程序的数据表示进行了抽象分层，形成了抽象屏障，
 * 使用的使用无须考虑下实现的细节，直接使用底层抽象后的函数功能即可。
 * 
 * 选择函数 realPart 等在依赖于类型标志进行选择该类型适用的函数，每个选择函数的定义都会依赖于它操作的特定的数据类型
*/
