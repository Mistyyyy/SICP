
/** 
 * 构造一棵 Huffman 编码树，我们需要 要进行编码的字母表，每个字符出现的相对频度，
 * 
 * 编码树的叶子节点，即字符和权重，权重也就是相对频度，这是造编码树的过程中需要用到的。
 * 
*/

const { Sets, unionSet } = require('./demo1');

function normilize(text = '') {
  const map = new Map();
  const res = [];

  for(const str of text) {
    if (map.get(str)) {
      let count = map.get(str);
      map.set(str, ++count);
    } else {
      map.set(str, 1);
    }
  }

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

Node.join = function(left, right) {
  const joinsets = unionSet(left.set, right.set);
  const allweight = left.weight + right.weight;
  const newSymbol = new Symbol(joinsets, allweight);
  const newNode = new this(newSymbol);
  newNode.left = left;
  newNode.right = right;
  return newNode;
}


function HuffmanTree(text = ''){
  const symbolList = normilize(text).sort((a, b) => a.weight - b.weight);
  function iterSubTree(nodes, list) {
    if (!list.length) return nodes;

    let node = null;
    let symbol1 = new Node(list.shift()), symbol2 = null;
    if (symbol1.weight + (!!list[0] && list[0].weight) < nodes.weight) {
      symbol2 = new Node(list.shift());
      const newSubNode = Node.join(symbol2, symbol1);
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

console.log(new HuffmanTree(te))