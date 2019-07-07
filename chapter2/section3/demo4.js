/** 
 * 
 * @description: 复数的表示以及运算过程
 * 
 * 复数的表示： z = x + iy;
 * 
*/

function square(a) {
  return a * a;
}

function degree(num) {
  return Math.PI / 180 * num;
}



//  消息传递
/** 
 * @todo: 这是直角坐标表示的方式
 * @param a : 表示实部
 * @param b : 表示虚部
*/
function MakeFromRealImag(real, imag) {
  this.complex = [real, imag];
}

MakeFromRealImag.prototype.realPart = function() {
  return this.complex[0];
}

MakeFromRealImag.prototype.imagPart = function() {
  return this.complex[1];
}

MakeFromRealImag.prototype.magnitude = function() {
  return Math.sqrt(
    square(this.realPart()) + square(this.realPart())
  )
}

MakeFromRealImag.prototype.angle = function() {
  return Math.atan(
    this.imagPart(), this.realPart()
  )
}

MakeFromRealImag.fromMagAng = function(r, a) {
  return new this(r * Math.cos(a), r * Math.sin(a))
}

/** 
 * @todo: 这是极坐标表示的方式
 * @param magnitude : 表示模
 * @param ang : 表示夹角
*/

function MakeFromMagAng(magnitude, ang) {
  this.complex = [magnitude, ang];
}

MakeFromMagAng.prototype.realPart = function() {
  return this.magnitude() * Math.cos(this.angle())
}

MakeFromMagAng.prototype.imagPart = function() {
  return this.magnitude() * Math.sin(this.angle())
}

MakeFromMagAng.prototype.magnitude = function() {
  return this.complex[0];
}

MakeFromMagAng.prototype.angle = function() {
  return this.complex[1];
}

MakeFromMagAng.fromRealImag = function(real, imag) {
  return new this(
    Math.sqrt(square(real) + square(imag)),
    Math.atan(imag, real)
  )
}

function addComplex(z1, z2) {
  return new MakeFromRealImag(
    z1.realPart() + z2.realPart(),
    z1.imagPart() + z2.imagPart()
  )
}

function subComplex(z1, z2) {
  return new MakeFromRealImag(
    z1.realPart() - z2.realPart(),
    z1.imagPart() - z2.imagPart()
  )
}

function mulComplex(z1, z2) {
  return new MakeFromMagAng(
    z1.magnitude() * z2.magnitude,
    z1.angle() + z2.angle()
  )
}

function divCompolex(z1, z2) {
  return new MakeFromMagAng(
    z1.magnitude() / z2.magnitude(),
    z1.angle() - z2.angle()
  )
}

const z1 = new MakeFromRealImag(3, 4);
const z2 = new MakeFromMagAng(5, 4/3);

console.log(z1.imagPart(), z2.magnitude());


/** 
 * 下面集中管理通用操作，每种数据类型用一种tag表示
 * 
 * @todo: 待办事项: 需要实现一种通用型的操作，可以针对不同种类的数据类型进行操作
 * 需要考虑的问题是 如何根据不同的数据类型的相似性操作做抽象，
 * 
 * 需要借鉴工厂模式对不同的数据类型进行管理，其中需要进行的功能包括注册，方法的使用。
 * 
 * 不同的数据类型的实例进行简单的创建
 * 
 * 以上只是包括相同的数据类型之间的操作，不同的数据类型之间如何做互操作
 * 
 * 我们需要借鉴一种强制转换的思想，即不同的数据类型之间的转行进行操作
 * 
 * 以 有理数 复数 普通实数 的操作表示
*/

// 使用

// function realPart(z) {
//   return Factories.applyGeneric('realPart', z);
// }

// function imagPart(z) {
//   return Factories.applyGeneric('imagPart', z);
// }

// function magnitude(z) {
//   return Factories.applyGeneric('magnitude', z);
// }

// function angle(z) {
//   return Factories.applyGeneric('angle', z);
// }

// // 注册

// function Factories(){
//   this.container = new Map();
// }

// Factories.prototype.applyGeneric = function(methodName, object) {

//   const tag = getTypetag(object);

//   return this.container.get(tag)[methodName]
// }

// Factories.prototype.register = function(tagName, object) {
//   this.container.set(tagName, object);
//   return this;
// }
