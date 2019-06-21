// 假设存在一种数据结构 

// List

// List(1,2,3) -> (1,2,3)

// head(list) -> head(List(1,2,3)) -> 1

// tail(list) -> tail(List(1,2,3)) -> (2, 3)

// refs(list, n) -> refs(List(1,2,3), 0) -> 1

const Nil = null;

function refs(list, n) {
  if (n === 0) return head(list)
  return refs(tail(list), n - 1);
}

function isNull(list) {
  return isEmpty(list)
}

function length(list) {
  if (isNull(list)) {
    return 0
  }
  return 1 + length(tail(list));
}

function append(list1, list2) {
  if (isNull(list1)) return list2
  return List(head(list1), append(tail(list1), list2));
}

function last(list) {
  if(length(list) === 1) {
    return head(list)
  }
  return last(tail(list));
}

function reverse(list) {
  if(length(list) === 1) {
    return list
  }
  return append(reverse(tail(list)), head(list));
}

// 练习2.19

const usCoins = [1, 50, 25, 10, 5];
const ukConis = [10 ,0, 50, 20, 10, 5, 2,1, 0.5];

function isEmpty(list) {
  return Array.isArray(list)&& !list.length ;
}

function tail(list) {
  if (!Array.isArray(list)) {
    return Nil
  }
  const [head, ...tail] = list;
  return tail;
}

function head(list) {
  if (!Array.isArray(list)) {
    return list;
  }
  const [head] = list;
  return head;
}

function countChange(amount, coinList) {
  if (amount === 0 ) return 1;
  if (amount < 0 || isEmpty(coinList)) return 0;
  return countChange(amount, tail(coinList))
    + countChange((amount - head(coinList)), coinList);
}

console.log(countChange(100, usCoins));

// 练习2.20

function samePartity(a, ...b) {
  return [
    a, 
    ...b.filter(i => i % 2 === a % 2),
  ]
}

// lambda 表达

const samePartityr = (a, ...b) => [a, ...b.filter(i => i % 2 === a % 2)]

// console.log(samePartity(1,2,3,4,5,5,6))



// map实现

// 迭代

function map(item, fn) {
  let res = [];
  for(let i = 0; i < item.length; i++) {
    res = [...res, fn(item[i], i, item, undefined)];
  }
  return res
}

function foreach(item, fn) {
  for(let i = 0; i < item.length; i++) {
    fn(item[i], i, item, undefined)
  }
}


// 递归

function map(item, fn) {
  let res = [];
  function cur(item, fn, index) {
    if (index === length(item)) {
      return res;
    }
    res = [...res, fn(item[index], index, item, undefined)];
    return cur(item, fn, ++index);
  }
  return cur(item, fn, 0);
}

// console.log(map([1,2,3], i => i * 2));

// 遍历树结构

// [[1,2], [1,2,3]] ->  [[1,2], [2,3]]
//                           /   \
//                        [1,2]  [2,3]
//                         / \    / \
//                       1    2   2  3

function countLevels(list) {
  if (isEmpty(list)) return 0;
  if (!Array.isArray(list)) return 1;
  return countLevels(head(list)) + countLevels(tail(list));
}

// console.log(countLevels([[1,2], [1,2,[1,2,3]]]))

// a b 都是list

function append(a, b) {
  if (isEmpty(a)) return b;
  if (isEmpty(b)) return a;
  return a.concat(b);
}

function reverse(list) {
  if (length(list) === 1) {
    return list;
  }
  return append(reverse(tail(list)), head(list));
}

// 练习 2.27

function push(a,b) {
  return [a, b];
}

function deepReverse(list) {
  // 叶子
  if (!Array.isArray(list)) {
    return list;
  }
  // 空节点
  if (isEmpty(list)) {
    return Nil;
  }
  return reverse(
    push(
      deepReverse(head(list)),
      deepReverse(tail(list))
    )
  )
}

console.log(reverse([1, 2]))
console.log(append([1], [2]))

console.log(deepReverse([[1,2], [3,4]])) // 1

// console.log(deepReverse([1,2]))

// console.log(deepReverse(2)) // 2

// console.log(deepReverse([[2]])) // 2
