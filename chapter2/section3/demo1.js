

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
  return this.element[0]
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
function intersectionSet(set1, set2, ) {
  if (set1.isEmpty() || set2.isEmpty()) return new Sets([]);

  if (elementOfSet(set1.first(), set2)) {
    return intersectionSet(set1.rest(), set2)
      .add(set1.first())
      .reverse()
  }

  return intersectionSet(set1.rest(), set2)
}

// 并集

function unionSet(set1, set2) {
  if (set1.isEmpty()) return set2

  if (set2.isEmpty()) return set1

  if (elementOfSet(set2.first(), set1)) {
    return unionSet(set1, set2.rest())
  }

  return unionSet(set1.add(set2.first()), set2.rest())
}

// 补集

function complementarySet(set1, set2) {
  
}
const s1 = new Sets([1,2,3]);
const s2 = new Sets([2,3,4,5])

console.log(unionSet(s1, s2))