const { rectangular, polar, typeTag } = require('./util');
const { realPartRectangular, imagPartRectangular, magnitudeRectangular, angleRectangular, makeFromRealImagRectangular } = require('./cartesian.js');
const { realPartPolar, imagPartPolar, magnitudePolar, anglePolar, makeFromMagAngPolar } = require('./polar');
const { map } = require('./map');

{
  exports.realPart = function(z) {
    return rectangular(z)
      ? realPartRectangular(z)
      : polar(z)
        ? realPartPolar(z)
        : null;
    throw new Error('Unknow Type --- REAL PART', z)
  } 
  
  exports.imagPart = function(z) {
    return rectangular(z)
      ? imagPartRectangular(z)
      : polar(z)
        ? imagPartPolar(z)
        : null;
    throw new Error('Unknow Type --- IMAG PART', z)
  } 
  
  exports.magnitude = function(z) {
    return rectangular(z)
      ? magnitudeRectangular(z)
      : polar(z)
        ? magnitudePolar(z)
        : null;
    throw new Error('Unknow Type --- MAGNITUDE', z)
  } 
  
  exports.angle = function(z) {
    return rectangular(z)
      ? angleRectangular(z)
      : polar(z)
        ? anglePolar(z)
        : null;
    throw new Error('Unknow Type --- ANGLE', z)
  } 
  
  exports.makeFromRealImag = function(x, y) {
    return makeFromRealImagRectangular(x, y)
  }
  
  exports.makeFromMagAng = function(r, degree) {
    return makeFromMagAngPolar(r, degree);
  }
}

{

  exports.realPart = function(z) {
    const type = typeTag(z);
    const target = map.get(type);

    if (target) {
      return target.realPart(z)
    }

    throw new Error('Unknow Type --- REAL PART', z)
  }

  exports.imagPart = function(z) {
    const type = typeTag(z);
    const target = map.get(type);

    if (target) {
      return target.imagPart(z)
    }

    throw new Error('Unknow Type --- IMAG PART', z)
  }

  exports.angle = function(z) {
    const type = typeTag(z);
    const target = map.get(type);

    if (target) {
      return target.angle(z)
    }

    throw new Error('Unknow Type --- ANGLE PART', z)
  }

  exports.magnitude = function(z) {
    const type = typeTag(z);
    const target = map.get(type);

    if (target) {
      return target.magnitude(z)
    }

    throw new Error('Unknow Type --- MAGNITUDE PART', z)
  }

  exports.makeFromRealImag = function(z, y) {
    const type = map.get('rectangular');
    return target.makeFromRealImag(z, y)
  }
  
  exports.makeFromMagAng = function(r, a) {
    const type = map.get('polar');
    return target.makeFromRealImag(r, a);
  }

  /** 
   * 这样，即实现了程序设计的可加性，又加入了模块的命名空间，不会出现命名的重复
   * 如果需要新增一个数据结构，只需要定义在单独的文件中，并且往map中加入相应的数据格式表示
   * 然后导出到抽象屏障之后的公共选择模块中，但是注意点，就是，我们还需要在该文件中，导出新增数据结构的表示
   * 这是必要的，因为程序使用的数据格式都是来源于定义的数据结构
   * 
   * 此外，这种方式也是充分利用了数据标示，来区分不同的数据，即每个数据结构都有tag进行表示
   * 
   * 总体流程如下
   * 
   * 使用数据 -> 调用通用操作 -> 获取数据标示，操作名称 -> 从表结构中取出该数据以及对应的操作名称 -> 使用 // 相当于 get(type, op)
   * 
   * 加入数据 -> 加入数据标示 -> 导出数据表示 -> 使用 // 相当于 put(type, op)
   * 
   * 由此可见，我们加入一种新的数据结构，只需要定义好，然后put进表中即可
   * 
   * 称之为数据导向，数据导向相比之前的一种手工修改通用操作，实现了表数据的集中管理，我们只需要关注如何存和如何取数据即可
   * 无需关心通用操作的实现细节
  */
}

