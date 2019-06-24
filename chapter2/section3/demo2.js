// 实现搜索二叉树

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
    return void(this.root = new Node(element))
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

BinarySearch.prototype.find = function(element) {
  
}

const t1 = new BinarySearch([3,1,2,4])

console.log(t1);