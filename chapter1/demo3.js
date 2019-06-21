const { factorialIter } = require('./demo2.js');

// 树形递归

// 斐波那契数的求值方法

// 递归
function fib(n) {
  if (n === 0) {
    return 0;
  }
  if(n<=2) {
    return 1
  }
  return fib(n-1) + fib(n - 2);
}

// console.log(fib(3))

// 迭代
function fibn(n) {
  function fibIter(a, b, count) {
    if (count === 0) {
      return b;
    }
    return fibIter(a+b, a, --count);
  }
  return fibIter(1,0,n);
}

// console.log(fibn(5))


// 换零钱的求值方式
// 递归
function countChange(amount) {

  function cc(amount, kindCoins) {
    if (amount === 0 ) return 1;
    if (amount < 0 || kindCoins === 0) return 0;
    return cc(amount, kindCoins - 1)
      + cc((amount - getOneCoin(kindCoins)), kindCoins);
  }

  function getOneCoin(kind) {
    switch(kind) {
      case 1: 
        return 1;
        break;
      case 2:
        return 5;
        break;
      case 3:
        return 10;
        break;
      case 4: 
        return 25;
        break;
      case 5:
        return 50;
        break;
    }
  }
  return cc(amount, 5);
}

// 迭代

function countChangei(amount) {
  let obj = {
    n1: [],
    n2: [],
    n3: [],
    n4: [],
    n5: [],
  }
  const temp = (n) => 'n' + n;
  // const isPrevHas(index, nowCount)
  function ccIter(amount, sum, count, currentCount) {
    console.log(obj)
    if (currentCount <= count) {
      if (currentCount === 1) {
        for(let i = amount; i >= 1; i--) obj[temp(currentCount)][i] = 1;
        sum++;
        debugger
      } else {
        for(let i = amount - getOneCoin(currentCount); i >=0; i-=getOneCoin(currentCount)) {
          for (let j = 1; j < currentCount; j++) {
            if (obj[temp(j)][i]) {
              obj[temp(currentCount)][amount-i] = 1;
              sum++;
            }
          }
          if (i === 0) {
            obj[temp(currentCount)][amount-i] = 1;
            sum++;
          }
        }
      }
      return ccIter(amount, sum, count, ++currentCount)
    } else {
      return sum
    }
    return ccIter(amount, 0, 5, 1)
  }

  function getOneCoin(kind) {
    switch(kind) {
      case 1: 
        return 1;
        break;
      case 2:
        return 5;
        break;
      case 3:
        return 10;
        break;
      case 4: 
        return 25;
        break;
      case 5:
        return 50;
        break;
    }
  }
  return ccIter(amount, 0, 5, 1);
}
console.time();
// console.log(countChange(1000))
console.timeEnd();

// 练习1.11
// discription: n < 3, f(n) = n; n >=3 f(n) = f(n-1) + f(n-2);


// 递归
function f3Sum(a) {
  if (a < 3) return a;
  return f3Sum(a-1) + f3Sum(a-2) + f3Sum(a-3);
}

// 迭代
function f3Sumi(a) {
  if (a < 3) return a;

  function sumIter(n1, n2, n3, count) {
    if (count < 3) return n1;
    return sumIter(n1+n2+n3, n1, n2, --count);
  }

  return sumIter(2,1,0,a);
}


// console.log(f3Sumi(9))
// 练习 1.12
// 帕斯卡三角
// 递归
/*
      1
     1 1
    1 2 1
   1 3 3 1
  1 4 6 4 1
*/

function getPascal(row, col) {
  if (col === row || col === 0) return 1
  return getPascal(row - 1, col -1) + getPascal(row -1, col)
}

// (row, col)=row!/col!⋅(row−col)!

//  迭代

function getPascali(row, col) {
  return factorialIter(row) / (factorialIter(col) * factorialIter(row-col))
}

console.log(getPascali(3,2));