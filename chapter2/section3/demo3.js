
/** 
 * 构造一棵 Huffman 编码树，我们需要 要进行编码的字母表，每个字符出现的相对频度，
 * 
 * 编码树的叶子节点，即字符和权重，权重也就是相对频度，这是造编码树的过程中需要用到的。
 * 
 * @summary: 以下完备的实现了Huffman编码树的细节
 * 
*/

const { Sets, unionSet } = require('./demo1');

function assert(condition, message = 'Error') {
  return condition
    ? null
    : new Error(message)
}

// 序列化参数
function normilizeText(text = '') {
  const map = new Map();

  for(const str of text) {
    if (map.get(str)) {
      let count = map.get(str);
      map.set(str, ++count);
    } else {
      map.set(str, 1);
    }
  }

  return map;
}

function normilizeMaps(map) {
  const res = [];

  for(const [key, value] of map.entries()) {
    res.push(
      new Symbol(
        new Sets([key]),
        value
      )
    )
  }

  return res;
}

const te = 'BACADAEAFABBAAAGAH';

// console.log(normilize(te))

function Symbol(set, weight){
  this.set = set;
  this.weight = weight;
}

function Node(symbol = { set: new Sets(), weight: 0 }){
  this.set = symbol.set;
  this.weight = symbol.weight;
  this.left = null;
  this.right = null;
}

Node.prototype.isLeaf = function(){
  return this.left === null && this.right === null;
}

Node.prototype.getElement = function() {
  return this.set.element;
}

Node.join = function(left, right) {
  const joinsets = unionSet(left.set, right.set);
  const allweight = left.weight + right.weight;
  const newSymbol = new Symbol(joinsets, allweight);
  const newNode = new this(newSymbol);
  newNode.left = left;
  newNode.right = right;
  return newNode;
}


/** 
 * @param args: receive string type or array which like [['a', 2], ['b', 3]]
*/
function HuffmanTree(args){
  let maps;
  if (typeof args === 'string') {
    maps = normilizeText(args);
  } else {
    maps = new Map(args);
  }
  const processMaps = normilizeMaps(maps);
  const symbolList = processMaps.sort((a, b) => a.weight - b.weight);

  function iterSubTree(nodes, list) {
    if (!list.length) return nodes;

    let node = null;
    let symbol1 = new Node(list.shift()), symbol2 = null;
    if (symbol1.weight + (!!list[0] && list[0].weight) < nodes.weight) {
      if (list[0]) {
        symbol2 = new Node(list.shift());
      }
      const newSubNode = symbol2 ? Node.join(symbol2, symbol1) : symbol1;
      node = Node.join(newSubNode, nodes)
    } else if (nodes.weight === 0) {
      symbol2 = new Node(list.shift());
      node = Node.join(symbol2, symbol1);
    } else {
      node = Node.join(symbol1, nodes);
    }
    return iterSubTree(node, list);
  }

  return iterSubTree(new Node(), symbolList)
}

const tree = new HuffmanTree(te);

function findStartStringLen(message, set) {

  const elements = set.getElement();

  for(const ele of elements) {
    if (message.startsWith(ele)) {
      return ele.length;
    }
  }

  return 0;
}

/** 
 * 
 * @todo:
 * 应该使用正确的思想，正确的思路，精简合理高效的方法解决问题。
 * 
 * 对已经给出的字段频率进行编码，Huffman树已经生成，但是不能仅仅局限在单字节。
 * 现在我们需要对多字节进行编码，这就相当于
 * 
 * 给出一段文本，我们根据编码树中非叶节点中的集合来判断文本从开始的几个字符在集合中
 * 
 * Huffman算法通过构造最优的二叉树，很完备的解决了编码问题。通过证明，可以证明出Huffman生成树是最优的。
 * 
 * @question
 * 1. 这里面衍射出两个问题，第一: 假定需要编码的文本是英文字符，是否需要对英文的大小写作出区分编码。如果对大小写区分，那么词频分布会呈现指数级的增长
 * 如果不需要，那么如何取保解码后的文本，跟原文本一致。
 * 
 * 2. 对于最常用的字符和最不常用的字符，其编码的过程中，随着词频的分布扩大，增长的数量级呈现什么样的增长情况。
 * 
 * 
*/
function encode(message, tree) {
  assert(typeof message === 'string', `The args ${message} must be a string type`);

  function iterEncode(message, tree) {
    if (!message.length) return '';
    let len = findStartStringLen(message, tree);
    
    return len === 0 ? encode(message.slice(1), tree) : findpath(message.slice(0,len), tree) + encode(message.slice(len), tree);
  }

  function findpath(char, tree, res = '') {
    if (!tree.getElement().includes(char)) {
      return '';
    }

    if (tree.isLeaf()) {
      return res;
    }

    return findpath(char, tree.left, res + '0') || findpath(char, tree.right, res + '1');
  }

  return iterEncode(message, tree)
}

function decode(bits, tree) {

  function chooseBranch(bit, tree) {
    if (bit > 1 || bit < 0) throw new Error('The bit must be 0 or 1');

    return Number(bit)
      ? tree.right
      : tree.left
  }

  function iterDecode(bits, branch, res = '') {
    if (!bits.length) return res;

    const nextBranch = chooseBranch(bits[0], branch);

    return nextBranch.isLeaf()
      ? iterDecode(bits.slice(1), tree, res + nextBranch.getElement())
      : iterDecode(bits.slice(1), nextBranch, res)
  }

  return iterDecode(bits, tree)
}

const message = 'AAHEC';
const bits = '00101111011111';

const bit = encode(te, tree);

const res = decode(bit, tree);

console.log(res, bit)

const sing = [
  ['A', 2],
  ['NA', 16],
  ['BOOM', 1],
  ['SHA', 3],
  ['GET', 2],
  ['YIP', 9],
  ['JOB', 2],
  ['WAH', 1],
  [' ', 30],
  ['\n', 5]
]

const singTree = new HuffmanTree(sing);

// 经过Huffman压缩为193个比特位即24个字节，如果按照定长字节编码则需要136个字节，压缩效率在6倍左右，且这是按照utf-8传输的情况下
// utf-16 的情况下差距是11倍左右
const sings = `  GET A JOB
  SHA NA NA NA NA NA NA NA NA
  GET A JOB
  SHA NA NA NA NA NA NA NA NA
  WAH YIP YIP YIP YIP YIP YIP YIP YIP YIP
  SHA BOOM`

const singBit = encode(sings, singTree);

console.log(singBit)

const result = decode(singBit, singTree);

console.log(result)