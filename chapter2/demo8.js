// 嵌套映射

/** 
 * 给定一个数 n 求出 1 <= i < j <= n 使的 i + j 为素数 的序列
 * 
 * 可枚举的序列 通常可用嵌套映射来表示序列之间的穷举
*/

// 生成 1 - n 的数组
function generate(n) {
  return Array.from({ length: n }, (_, index) => index + 1)
}

function isPrime(num) {
  if (num <= 3) {
    return num > 1;
  }
  // 不在6的倍数两侧的一定不是质数
  if (num % 6 !== 1 && num % 6 !== 5) {
      return false;
  }
  const sqrt = Math.sqrt(num);
  for (const i = 5; i <= sqrt; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) {
          return false;
      }
  }

  return true
}

function getDoubleMappingData(n) {
  return generate(n)
    .reduce((prev, cur) => {
      return prev.concat(
        generate(cur - 1)
          .map(item => [item, cur])
      )
    }, [])
}

function getPrimePair(n) {
  return getDoubleMappingData(n)
    .filter(([_,__,sum]) => isPrime(sum))
}

// console.log(getPrimePair(10))



// [1,2,3] 生成这一集合的所有排列方式

function flatMap(processed, sequence) {
  return sequence
    .map(processed)
    .flat()
}

// 练习 2.40
function uniqueParis(n) {
  return flatMap(
    item => generate(item - 1).map(i => [i, item]),
    generate(n)
  )
}

function sumPrimePairs(n) {
  return uniqueParis(n)
    .filter(([a, b]) => isPrime(a + b))
}

function remove(item, arr) {
  return arr.filter(i => item !== i )
}

function permutations(sequence) {
  if (sequence.length <= 1) return sequence
  return flatMap(
    item => permutations(remove(item, sequence)).map(i => [item].concat(i)),
    sequence
  )
}

// 练习 2.41 给定正整数 n  产生所有小于等于 n 的三个相异整数 i j k 使得 i + j + k = n

function getThreeIntergeParis(n) {
  return flatMap(
    item => flatMap(i => generate(i - 1).map(j => [item, i, j]) , generate(item - 1)),
    generate(n)
  )
}

function sum(arr) {
  return arr.reduce((a, c) => a + c)
}

function equal(res) {
  return function(arr) {
    return res === sum(arr)
  }
}

function getEqualparis(n) {
  return getThreeIntergeParis(n)
    .filter(equal(n))
}

const res = getEqualparis(18)



// console.log(sumPrimePairs(4));

// console.log(res);

// console.log(permutations(['a', 'b', 'c', 'd']));

// 练习 2.42 

// 八皇后 根据棋盘宽度 n 返回一个过程，即求出 第 k 列放皇后的所有序列组合
// queueCols 是返回前 k 列所有的组合情况
// 八皇后解答
/** 
 * 八皇后递归会存在一个问题就是，每一个递归式都是基于上一步骤进行操作的
 * 如果上一个步骤得到的结果是空，那么该递归式就需要重新组合所有的结果
 * 这是不可避免的，因为每增加一列/行，确实需要重新组合结果
 * 我们可以使用缓存来解决这个问题
*/

function cache(fn) {
  const map = new Map();

  return arg => {
    if (!map.has(arg)) {
      map.set(arg, fn(arg))
    }
    return map.get(arg)
  }
}

function toArray(ele, newEle) {
  return [ele, newEle].flat();
}

function safe(k, position) {
  const ele = position[k - 1];
  return !position.includes(ele)
    && !position.filter((row, col) => Math.abs((ele - row)/(position.length - col)) === 1)
}

const cachedQueue = cache(queues);

function queues(size) {

  function queueCols(k) {

    if (k === 1) return generate(size).map(i => [i])

    return flatMap(
      rest => generate(size)
        .map(newRow => [...rest, newRow]),
        queueCols(k - 1)
    )
  }

  return queueCols(size).filter(item => safe(size, item))

}


console.log(cachedQueue(5))
// console.log(cachedQueue(7).length)


// 使用递归回溯法求八皇后解

function getQueue(n) {
  
  const queueEnv = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
  // row 为行, col 为列
  
  function check(row, col) {

    for (let i = 0; i < col; i++) {
      // 检查列
      if (queueEnv[row][i]) {
        return false
      }

      // 检查左侧向
      if (row-i-1 >=0 && queueEnv[row-i-1][col-i-1])  {
        return false
      }

      // 检查右侧向
      if (row+i+1 < n && queueEnv[row+i+1][col-i-1]) {
        return false;
      }
    }

    return true;
  }

  function settleQueue(row) {
    if (row === n) return true;

    // 遍历行
    for (let i = 0; i < n; i++) {

      for (let x = 0; x < n; x++) {
        // 重置
        queueEnv[x][row] = 0;
      }

      if (check(i, row)) {
        queueEnv[i][row] = 1;
        if (settleQueue(row + 1)) {
          return true;
        }
      }
    }
    return false;
  }

  return settleQueue(0) && queueEnv
}

console.log(getQueue(8))