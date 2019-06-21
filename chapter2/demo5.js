// 树 -> 映射 -> 一颗新树
// 左子树映射 + 右子树映射

/** 
 * 
 * 如何遍历一棵树
 * 
 * 如何对树上的节点操作
 * 
 * 子树如何组装成一棵树
 * 
 * 如何映射一个新树
 * 
 * 用递归的方法遍历树
 * 
 * 1. 确定递归终止条件
 * 2. 递归遍历左子树
 * 3. 递归遍历右子树
*/

let tress = [[1,[1,2]], [3,[1,2]]];

const tree = [
  [1, [3, 4]],
  tress,
]

const left = tree => tree[0];
const isEmpty = arr => arr.length === 0;
const right = tree => tree[1];
const isLeaf = node => typeof node !== 'object' || node === null;
const concat = (left, right) => {
  return [left, right]
}

function reverse(arr) {
  return arr.reverse();
}

// 练习2.27

function deepReverse(tree) {
  if(isLeaf(tree) || isEmpty(tree)) {
    return tree;
  }
  return reverse(
    concat(
      deepReverse(left(tree)),
      deepReverse(right(tree))
    )
  )
}

// 练习2.28

function fringe(tree) {
  let res = []
  function traver(tree) {
    if (isLeaf(tree)) {
      return void res.push(tree);
    }
    if (isEmpty(tree)) {
      return void 0;
    }
    traver(left(tree))
    traver(right(tree))
  }
  traver(tree)
  return res;
}

console.log(fringe(tree));

// 练习 2.29

function makeMobile(left, right) {
  return [left, right];
}

function makeBranch(length, structure) {
  if (this instanceof makeBranch) {
    this.length = length;
    this.structure = structure;
  }
  return (this instanceof makeBranch) && this || new makeBranch(length, structure);
}

function selectLeft(tree) {
  return tree[0];
}

function selectRight(tree) {
  return tree[1];
}

function branchLength(branch) {
  return branch.length;
}

function branchStructure(branch) {
  return branch.structure;
}

function totalWeight(tree) {
  function rescurWeight(tree) {
    if (tree instanceof makeBranch) {
      return tree.structure;
    }
    if (isEmpty(tree)) {
      return 0;
    }
    return rescurWeight(selectLeft(tree)) + rescurWeight(selectRight(tree));
  }
  return rescurWeight(tree);
}

function isBalance(tree) {
  function rescurBalance(tree) {

    if (selectLeft(tree) instanceof makeBranch && selectRight(tree) instanceof makeBranch) {
      const left = selectLeft(tree);
      const right = selectRight(tree);
      return left.length * left.structure === right.length * right.structure;
    }

    if (isEmpty(tree)) {
      return false;
    }
    
    return rescurBalance(selectLeft(tree)) && rescurBalance(selectRight(tree))
  }

  return rescurBalance(tree)
}

const leftBranch = makeMobile(makeBranch(1,2), makeBranch(2,1));
const rightBranch = makeMobile(makeBranch(2,3), makeBranch(3,2));
const finas = makeMobile(leftBranch, rightBranch);
console.log(finas);

console.log(isBalance(finas));

// 二叉树
function mapTree(tree, factor) {
  if (isLeaf(tree)) {
    return tree * factor
  }
  if (isEmpty(tree)) return ;
  return concat(
    mapTree(left(tree), factor),
    mapTree(right(tree), factor)
  )
}

// console.log(mapTree(), 10))

// 练习2.30

// vistitor 访问者，
/** 
 *  {
 *    map: fn() 树的映射
 *    enter: fn() 进入
 *    exit: fn() 离开
 *  }
 * 
*/
function traverser(tree, visitor) {

  function traverserNode(tree) {
    if (visitor.enter) {
      visitor.enter(tree);
    }
    if (isLeaf(tree) || isEmpty(tree)) {
      if (visitor.exit) {
        visitor.exit(tree);
      }
      if (visitor.map) {
        return visitor.map(tree);
      }
      return tree;
    }

    return concat(
      traverserNode(left(tree)),
      traverserNode(right(tree)),
    )
  }

  return traverserNode(tree);
}

traverser(tress, {
  map(node) {
    return node * 20;
  },
  enter(node) {
    // console.log('enter node' + node);
  },
  exit(node) {
    // console.log('exit node' + node);
  }
})

// 练习 2.32 给定一个集合，生成一个集合所有子集的集合。

// 可以将原问题进行分解成子问题，将集合看成一棵树 左子树只有一个叶子节点。
// 所有子集的集合 -> 包含左子树的子集(遍历右子树 -> map -> 连接左子树) + 不包含左子树的子集(右子树的子集)
// 这样就将问题分解为 -> 求右子树的子集
//  [head, ...tail] -> [subsets(tail).map(cons(head)) , subsets(tail)]

const lefts = (arr) => arr[0]
const rights = (arr) => {
  let origin = [];
  for (let i = 1; i < arr.length; i++) {
    origin.push(arr[i]);
  }
  return origin;
}

const cons = b => a => a.concat(b);

// [0,1,2] -> [ subsets([1,2]).map(concat(0)), subsets([1,2])]
//         -> [[0,2,1], [0,2], [0,1], [2,1], [2], [1]]
// [1,2] -> [ subsets([2]).map(concat(1)), subsets([2])]
//       -> [[2,1], [2], [1]]
function subsets(set) {

  if (set.length === 1) {
    return [set, []];
  }
  debugger
  return [
    subsets(rights(set))
      .map(cons(lefts(set))),
    subsets(rights(set))
  ]
}

// subsets([0,1,2])
// [subsets([1,2]).map(cons(0)), subsets([1,2])]
// [subsets([2]).map(cons(1)), subsets([2])]
// subsets([2]) -> [[2], []]
// subsets([2]).map(cons(1)) -> [[[2,1], [1]], [[2],[]]]

console.log(subsets([2]).map(cons(1)));
console.log(subsets([1,2,3]));

module.exports = {
  fringe,
  isLeaf
}

