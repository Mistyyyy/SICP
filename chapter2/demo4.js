// 模拟 序对

const Nil = null;
const isNil = a => a === null;
const isEmpty = cons => cons.length && cons.length === 0;
const square = a => a*a;

const cons = (a, b) => [a, b];

const list = (...arg) => {
  return arg;
}

const car = cons => cons[0];

const cdr = cons => {
  const [head, ...tail] = cons;
  return tail;
}

const cadr = cons => car(cdr(cons))

const c1 = cons(1,2);
const c2 = cons(2,3);

const c3 = cons(c1, c2);

const c4 = cons(c3, 2)

const list1 = list(1,2,3,4);
const list2 = list(5,6,7,8);


function refs(list, n)  {
  if (n === 0) {
    return car(list);
  }
  return refs(cdr(list), --n);
}

console.log(refs(list1, 3))

// 递归
function length(list) {
  if (!isPair(list)) return 0
  return 1 + length(cdr(list));
}

// console.log(length(list1));

// 迭代
function length(list) {
  function iter(items, count) {
    if(isNil(items)) return count;
    return iter(cdr(items), ++count);
  }
  return iter(list, 0)
}

function append(list1, list2) {
  if (isNil(list1)) return list2
  return cons(
    car(list1),
    append(cdr(list1), list2)
  )
}

// 练习2.17
function lastpair(list) {
  if (length(list) === 1) return car(list)
  return pair(cdr(list))
}
// 练习2.18
function reverse(list) {
  function iter(remained, result) {
    if (isNil(remained)) {
      return result
    }
    return iter(
      cdr(remained),
      cons(car(remained), result)
    )
  }
  return iter(list, Nil)
}
// 练习2.19
function countChange(amount, coinList) {
  if (amount === 0 ) return 1;
  if (amount < 0 || isEmpty(coinList)) return 0;
  return countChange(amount, tail(coinList))
    + countChange((amount - head(coinList)), coinList);
}
// 练习2.20
function samePartity(a, ...b) {
  return [
    a, 
    ...b.filter(i => i % 2 === a % 2),
  ]
}

// map 的高阶抽象如何逐层建立

// 根据 factor 来应用于表结构中的所有元素。这样，映射表结构中所有元素的目的达到了。
// 但是没有灵活性，实现过程无法分离。每次引用，实现过程都会是关注点。
// 可操作的空间很小。
function factorList(list, factor) {
  if (isNil(list)) return Nil;
  return cons(
    car(list) * factor,
    factorList(cdr(list), factor)
  )
}

// console.log(factorList(list1, 10)) // list(10, 20, 30, 40)

// 将操作过程进行了抽象，有了一定的灵活性。
// 可操作性还不是很高，因为操作过程与函数定义耦合在了一起。

function scaleList(list, square) {
  if (isEmpty(list)) return Nil;
  return cons(
    square(car(list)),
    scaleList(cdr(list), square)
  )
}

console.log(scaleList(list1, square)) // list(1, 4, 9, 16)

// 我们应该将一些公共模式抽象成高阶过程。只接受要处理的列表和处理过程，
// 使得处理过程的实现和内部如何提取元素，实现变换的过程形成了一道抽象屏障。
// 无需关心如何建立关联，内部如何处理。只需要关心，如何生成高阶过程。

function map(list, fn) {
  if (isNil(list)) return Nil;
  return cons(
    fn(car(list)),
    scaleList(cdr(list), fn)
  )
}

// console.log(map(list1, square)) // list(1, 4, 9, 16)

// 递归的本质就是对原有问题进行分解，形成字问题。再继续对子问题进行求解。
// 前提是分解成元问题时，必须给出一个肯定的解，不然会造成递归的无限循环。

// console.log(cons(list1, list2));
