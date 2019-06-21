const { fringe } = require('./demo5');

// function sumOddNum(tree) {
//   if (isEmpty(tree)) return 0;
//   if (isLeaf(tree)) {
//     if (isOdd(tree)) {
//       return tree * tree;
//     }
//     return 0;
//   }
//   return left(tree) + right(tree);
// }

const odd = n => n % 2 === 1;
const square = n => n * n;
Array.prototype.sum = function() {
  return this.reduce((a, c) => a + c);
}
const head = arr => {
  const [head, ...tail] = arr;
  return head;
}

const concat = (a, b) => [a, b];

const add = (a, b) => a + b;

const tail = arr => {
  const [head, ...tail] = arr;
  return tail;
}

const isEmpty = arr => {
  return Array.isArray(arr) && arr.length === 0;
}

function accumulate(operate, initial, list) {
  if (isEmpty(list)) {
    return initial;
  }
  return operate(
    head(list),
    accumulate(
      operate,
      initial,
      tail(list)
    )
  )
}

// 这种形式更像迭代
function accumulateRight(operate, initial, list) {
  function iter(res, list) {
    if (isEmpty(list)) {
      return res;
    }

    return iter(
      operate(res, head(list)),
      tail(list)
    )
  }

  return iter(initial, list)
}

// 在处理线性数据的时候，并最终产生结合数据 ru: 数据的累加，列表的反转，累乘，考虑到递归式的规则和方向，即可以选择左递归处理，也可以右递归处理。
// 两种处理方式的区别在于，数据处理的层次方式。如f (1, f(2, f(3, ...))) 和 g(g(g(g(....), 4), 3), 2), 1)
// 当然，如果数据满足交换律和结合律的情况下，两种处理方式产生的结果是相同的。

/** 
 * 练习 2.36
*/

const ARRAY_CONCAT = [].concat;

// seqs 是序列的序列
function headN(seqs) {
  return seqs.map(head);
}

function tailN(seqs) {
  return seqs.map(tail);
}

function accumulateN(op, init, seqs) {

  if (head(seqs) === null) {
    return null;
  }

  return ARRAY_CONCAT.apply(
    accumulate(op, init, head-n(seqs)),
    [
      accumulate-n(op, init, tail-n(seqs))
    ]
  )
}

  /**
   *
   *
   * @param {*} operate 操作
   * @param {*} initial 初始值
   * @param {*} Listoflist 序列的序列
   * @returns
   */
function accumulateN(operate, initial, Listoflist) {
  if (isEmpty(list)) {
    return initial;
  }
  return [accumulate(operate, initial, head(Listoflist))]
    .concat(accumulateN(operate, initial, tail(Listoflist)))
}

[(1,2,3,4), (5,6,7,8)] // 看作两个向量 响应的位置做乘法，最后累加 如何做？

// 解法 -> 先将两个序列做乘法 得出一个序列 然后再累加

function dotProduct(v, w) {
  return accumulate(add, 0, map(product, v, w))
}




// 练习2.33
const map = (fn, list) => accumulate((x, y) => [fn(x), ...y], [], list);
const append = (list1, list2) => accumulate(concat, list2, list1);
const length = list => accumulate((x, y) => y + 1, 0, list);
const double = x => x*2;

// console.log(map(double, [1,2,3]))
// console.log(length([1,2,3]))


let tress = [[1,[1,2]], [3,[1,2]]];

const tree = [
  [1, [3, 4]],
  tress,
]

function sumOddNum(tree) {
  return fringe(tree)
    .filter(odd)
    .map(square)
    .sum()
}

// console.log(sumOddNum(tree));



/** 
 * 
 * function sumOddNum(tree) {
 *    return 
 *      ccompose(
 *        sum
 *        map(square)
 *        filter(noEven),
 *        getAllLeafs
 *      )(tree)
 * 
 * 
 * 
//  *      getAllLeafs(tree)
//  *        .filter(noEven)
//  *        .map(square)
//  *        .sum()
 * }
*/

// 把以上程序分解成信号流
// 1. 枚举出所有的叶子节点 -> 2. filter:过滤所有的even数据 -> 3. map: square -> 4.累加

function evenFib(n) {
  let res = [];
  function next(k) {
    if (k > n) return res;
    let cur = fib(k);
    if (isEven(cur)) {
      res.push(cur);
    }
    return next(k+1);
  }
  return next(0)
}

/** 
 * function evenFib(n) {
 *   return 
 *     getAllInterge(n)
 *      .map(fib)
 *      .filter(noOdd)
 *      .reCompose()
 * }
*/

// 1. 枚举出所有的数字 -> 2. map: 求的斐波那契数 -> 3. filter: 过滤所有的odd数据 -> 4.重新组合

// 练习 2.34

function honerEval(x, list) {
  return accumulate(
    (thiscoeff, highiterms) => thiscoeff + x * highiterms,
    0,
    list
  )
}

// const res = honerEval(2, [1,3,0,5,0,1]);

// console.log(res);

// 练习 2.35

const isLeaf = node => typeof node !== 'object' || node === null;
function countLevels(tree) {
  return accumulate(
    add,
    0,
    map(x => {
      if (isLeaf(x)) return 1;
      if (isEmpty(x)) return 0;
      return countLevels(x)
    }, tree)
  )
}

const { log } = console;

// const rescord = countLevels([[1,2],[3,4]])

// log(map(x => x, [[1,2],[3,4]]))

// 练习 2.36


