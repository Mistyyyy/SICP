/** 
 * 
 * 0-1 背包问题
*/

const path = require('path');

console.log(path.resolve('.'))

function getRandom(num) {
  return Array.from({ length: num }, () => {
    return Math.round(Math.random() * num)
  });
} 

let callNum = 0;

function maxValue(weightList, valueList, packWeight) {
  let memo = new Map();
  let index = weightList.length - 1;
  function recurMaxvalue(weight, value, pweight, idx) {
    callNum++;
    if (pweight < 0 || idx < 0) return 0;

    if (pweight < weight[idx]) {
      return recurMaxvalue(weight, value, pweight, idx - 1);
    }

    if (!memo.has(`${idx}-${pweight}`)) {
      res = Math.max(
        recurMaxvalue(weight, value, pweight, idx - 1),
        value[idx] + recurMaxvalue(weight, value, pweight - weight[idx], idx - 1),
      );
      memo.set(`${idx}-${pweight}`, res);
    }
    return memo.get(`${idx}-${pweight}`);
  }

  const value = recurMaxvalue(weightList, valueList, packWeight, index);
  console.log(`
The all func calls is ${callNum}
The max value is ${value}, The weight length is ${weightList.length}`);
  return value;
}

const weight = getRandom(80);
const values = getRandom(80);

maxValue(weight,  values, 100)