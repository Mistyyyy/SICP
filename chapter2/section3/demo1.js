

// 假设 eq 是比较两个值是否相等
function eq() {

}

// 练习 2.54
function equal(list1, list2) {
  if (!eq(list1.car(), list2.car())) {
    return false;
  }

  if (!list1.length && !list2.length) {
    return true
  }

  return equal(
    list1.cdr(),
    list2.cdr()
  )
}

// 抽象数据的求导

function deriv(exp, vars) {
  if (isNumber(exp)) return 0;

  if (isVar(exp)) {
    return isSameVar(exp, vars)
      ? 1
      : 0
  }

  if (isSum(exp)) {
    return makeSum(
      deriv(addend(exp), vars),
      deriv(augend(exp), vars)
    )
  }

  if (isProduct(exp)) {
    return makeSum(
      makeProduct(
        multiplier(exp),
        deriv(multiplicand(exp), vars)
      ),
      makeProduct(
        multiplicand(exp),
        deriv(multiplier(exp), vars)
      )
    )
  }

  if (isExp(exp)) {
    return makeProduct(
      makeProduct(
        getExp(exp),
        makeExp(getN(exp), getExp(exp) - 1)
      ),
      deriv(getN(exp), vars)
    )
  }
}

// 集合的表示

// 我们使用数组来表示抽象集合

/** 
 * @param ele @type: @iterable 
*/
function Sets(ele) {
  this.element = [...ele];
}

Sets.prototype.first = function() {
  return this.element[0];
}

Sets.prototype.last = function() {
  return this.element[this.element - 1];
}

Sets.prototype.sort = function() {
  this.element = this.element.sort((a, b) => a - b);
  return this;
}

Sets.prototype.rest = function() {
  const [first, ...rests] = this.element;

  return new Sets(rests);
}

Sets.prototype.add = function(ele) {
  return (this.element[this.element.length] = ele, this);
}

Sets.prototype.isEmpty = function() {
  return !this.element.length
}

Sets.prototype.reverse = function() {
  return (this.element = this.element.reverse(), this);
}

Sets.join = function(set1, set2) {
  const ele = set2.element;

  const origin = set1.element;

  const mergeEle = [...origin, ...ele];

  const Construct = this;

  return new Construct(mergeEle);
}


function elementOfSet(x, set) {
  if (set.isEmpty()) return false;

  if (set.first() === x) return true;

  return elementOfSet(x, set.rest())
}

// 集合新增元素
function adjoinSet(x, set) {
  return elementOfSet(x, set)
    ? set
    : set.add(x)
}

// 交集
// 解题思路是从 A 集合取出元素看是否存在于 B 集合，如存在，则纳入新集合
function intersectionSet(set1, set2, ) {
  if (set1.isEmpty() || set2.isEmpty()) return new Sets([]);

  if (elementOfSet(set1.first(), set2)) {
    return Sets.join(
      new Sets([set1.first()]),
      intersectionSet(set1.rest(), set2)
    )
  }

  return intersectionSet(set1.rest(), set2)
}

// 并集
// 练习2.59
function unionSet(set1, set2) {
  if (set1.isEmpty()) return set2

  if (set2.isEmpty()) return set1

  if (elementOfSet(set2.first(), set1)) {
    return unionSet(set1, set2.rest())
  }

  return unionSet(set1.add(set2.first()), set2.rest())
}


const s1 = new Sets([1,2,3]);
const s2 = new Sets([2,3,4,5]);

const s3 = new Sets([5,6,2])

console.log(sortIntersectionSet(s1, s2), s3.sort());

// 排序后的集合操作

// adjoin
function sortAdjoinSet(x, sortedSet) {
  if (x < sortedSet.first()) {
    return Sets.join(
      new Sets([x]),
      sortedSet
    );
  }

  if (x > sortedSet.last()) {
    return sortedSet.add(x)
  }

  return adjoinSet(x, sortedSet).sort()
}

// 交集
function sortIntersectionSet(sortset1, sortset2) {
  if (sortset1.isEmpty() || sortset2.isEmpty()) return new Sets([]);

  const firstA = sortset1.first(), firstB = sortset2.first();

  if (firstA === firstB) {
    return Sets.join(
      new Sets([firstA]),
      sortIntersectionSet(sortset1.rest(), sortset2.rest())
    )
  }

  if (firstA < firstB) {
    return sortIntersectionSet(
      sortset1.rest(),
      sortset2
    )
  }

  return sortIntersectionSet(
    sortset1,
    sortset2.rest()
  )
}

function sortUnionSet(sortset1, sortset2) {
  if (sortset1.isEmpty()) return sortset2

  if (sortset2.isEmpty()) return sortset1

  if (sortset1.first() === sortset2.first()) {
    return sortUnionSet(
      sortset1.rest(),
      sortset2.rest()
    )
  }

  if (sortset1.first() < sortset2.first()) {
    return Sets.join(
      sortset1.first(),
      sortUnionSet(sortset1.rest(), sortset2)
    )
  }

  return Sets.join(
    sortset2.first(),
    sortUnionSet(sortset1, sortset2.rest())
  )
}