// 实现搜索二叉树
const { Sets } = require('./demo1');

function Node(value, left = null, right = null) {
  this.value = value;
  this.left = left;
  this.right = right;
}

// 以数组为实例元素
function BinarySearch(elements) {
  this.root = null;
  this.tree = this.create(...elements);
}

BinarySearch.prototype.create = function(...elements) {
  for(const ele of elements) {
    this.add(ele, this.root);
  }

  return this;
}

BinarySearch.prototype.add = function(element, node = this.root) {

  if (this.root === null) {
    return void (this.root = new Node(element))
  }

  if (element === node.value) {
    return node;
  }

  if (element < node.value) {
    if (node.left === null) {
      node.left = new Node(element);
    } else {
      this.add(element, node.left)
    }
  }
  
  if (element > node.value) {
    if (node.right === null) {
      node.right = new Node(element)
    } else {
      this.add(element, node.right)
    }
  }
}

BinarySearch.prototype.remove = function(element) {
  
}

BinarySearch.prototype.find = function(element, node = this.root) {
  if (node === null) return false;

  if (element === node.value) return node

  if (element < node.value) return this.find(element, node.left);

  return this.find(element, node.right);
}

const t1 = new BinarySearch([3,1,2,4])

console.log(t1);

t1.add(0)

console.log(t1.find(0));


// 为有序元素序列平衡二叉树

function BalanceBinaryTree(element) {
  this.root = null;
  this.tree = this.create(...element);
}

BalanceBinaryTree.prototype.create = function(...elements) {
  const length = elements.length;

  if (length === 0) return this;

  const mid = (length % 2 + length)/2 - 1;
  let left = elements.slice(0, mid);
  let right = elements.slice(mid+1);
  this.add(elements[mid]);
  this.create(...left);
  this.create(...right);
  return this;
}

Object.setPrototypeOf(BalanceBinaryTree.prototype, BinarySearch.prototype);

const bt = new BalanceBinaryTree([1,2,3,4]);

console.log(bt);

// 两个集合的并集
function unionSet(set1, set2){
  const elementsOfSet1 = set1.element;

  const treeOfSet1 = new BalanceBinaryTree(elementsOfSet1);

  function iterUnionSet(res, tree, set) {
    if (set.isEmpty()) return res;
    if (!tree.find(set.first())) {
      res.add(set.first())
    }

    return iterUnionSet(res, tree, set.rest());
  }

  return iterUnionSet(set1, treeOfSet1, set2)
}

// 两个集合的交集

function intersection(set1, set2){
  const elementsOfSet1 = set1.element;

  const treeOfSet1 = new BalanceBinaryTree(elementsOfSet1);

  function iterIntersectionSet(res, tree, set) {
    if (set.isEmpty()) return res;

    if (tree.find(set.first())) {
      res.add(set.first())
    }

    return iterIntersectionSet(res, tree, set.rest());
  }

  return iterIntersectionSet(new Sets(), treeOfSet1, set2);
}