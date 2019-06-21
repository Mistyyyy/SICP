// 图形作业的

// 基本单元，可以画出一张基本图片
const wave = (painter) => `${painter} IS PAINTER`;

const beside = (painter1, painter2)  => [painter1, painter2]

const below = (painter1, painter2) => ({
  top: painter1,
  below: painter2
})

const filpVert = painter => ({
  reverse: painter,
})

// 操作单元

// beside 接受两个画家，产生一个复合型画家，将两个画家产生的图片并排画出的画家

// below 接受两个画家，产生一个复合型画家，将两个画家产生的图片上下排列画出的画家

// filpVert 接受一个画家，产生一个将该画家产生的图片上下颠倒画出的画家

// 
function wave2(wave) {
  return beside(wave, filpVert(wave))
}

function wave4() {
  return below(wave2, wave2)
}

function wave4A(painter) {
  const painter2 = wave2(painter);

  return below(painter2, painter2);
}

function rightSplit(painter, n) {
  if (n === 0) return painter;

  const smaller = rightSplit(painter, n-1);

  return beside(
    painter,
    below(smaller, smaller)
  )
}

function cornerSplit(painter, n) {
  if (n === 0) return painter;

  function upSplit(painter, n) {
    if (n === 0) return painter;
    return below(
      upSplit(painter, n-1),
      painter
    )
  }

  function rightSplit(painter, n) {
    if (n === 0) return painter;
    return beside(
      painter,
      rightSplit(painter, n-1)
    )
  }

  const up = upSplit(painter, n-1);
  const right = rightSplit(painter, n-1);
  
  return below(
    beside(up, cornerSplit(painter, n-1)),
    beside(painter, right)
  )
}


// 练习 
function split(bigOpt, smallOpt) {
  function inner(paint, n) {
    return bigOpt(
      smallOpt(inner(paint, n -1), inner(paint, n-1)),
      paint
    )
  }

  return inner;
}

const rightSplitA = split(beside, below);

const upSplit = split(below, beside);

// 画家是一个过程，可以接受参数是某一类型的框架，产生一个新的画家
// 图形映射成特定的形状是针对一种向量映射，以小见大，将一个点映射到另一个点。而图形形成的过程就是点形成图形的过程。
// 以下构造函数是生成向量的坐标表现形式

function MakeVert(x, y) {
  return [x, y];
}

MakeVert.prototype.selectXVert = function() {
  return this[0]
}

MakeVert.prototype.selectYVert = function() {
  return this[1]
}

MakeVert.prototype.addVert = function(vert) {
  return new MakeVert(
    this.selectXVert() + vert.selectXVert(),
    this.selectYVert() + vert.selectYVert()
  )
}

MakeVert.prototype.subVert = function(vert) {
  return new MakeVert(
    this.selectXVert() - vert.selectXVert(),
    this.selectYVert() - vert.selectYVert()
  )
}

MakeVert.prototype.scaleVert = function(s) {
  return new MakeVert(
    this.selectXVert() * s,
    this.selectYVert() * s
  )
}

// 线段可以使用向量进行表示，即原点到起点和原点到终点
function MakeSegment(x1, y1, x2, y2) {
  
  const args = Array.from(arguments);

  if (args.length === 1 && (args[0] instanceof MakeVert)) {
    return args;
  }

  if (args.length === 2 && (args[0] instanceof MakeVert) && (args[1] instanceof MakeVert)) {
    return args;
  }

  if (args.length === 4 && !args.some(item => typeof item !== 'number')) {
    return [
      new MakeVert(x1, y1),
      new MakeVert(x2, y2)
    ]
  }

  throw new Error('The argument must be an MakeVert type or number point')
} 

MakeSegment.prototype.startSegment = function() {
  return this[0];
}

MakeSegment.prototype.endSegment = function() {
  return this[1] || this[0];
}

// 建立框架的坐标映射

// 接受框架参数
function frameCoordMap(frame) {

  return function(vert) {
    return addVert.call(
      getOriginFrame(frame),
      addVert.call(
        scaleVert(
          v.selectXVert,
          getEdgeFrame(frame)
        ),
        scaleVert(
          v.selectYVert,
          getEdge2Frame(frame)
        ),
      )
    )
  }
}