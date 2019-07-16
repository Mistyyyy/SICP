/** 
 * @todo: 实现一个累加器，初始值由程序内部所控制
 * 练习3.1
*/

function makeAccumulator(init) {
  return adder => init = init + adder
}

/** 
 * @todo: 练习3.2
 * 统计函数被调用的次数，可以输出原函数调用的结果，也可以重置次数
*/

function makeMonitored(fn) {
  let counts = 0;
  return function fns(...args) {
    fns.counts = ++counts;
    fns.reset = function() {
      counts = 0;
      fns.counts = counts;
      return counts;
    }
    return fn(...args);
  }
}

/** 
 * 练习 3.3, 3.4
*/

function makeAccount(balance, secret) {
  let inputErrorCounts = 0;
  const balMap = new Map([[secret, balance]]);

  function mayCallTheCop() {
    if (inputErrorCounts >= 7) {
      throw new Error('You have input the incorrect password many times, the cop is on the way')
    }
  }

  return {
    withraw(secret, numbers) {
      if (balMap.get(secret)) {
        const balance = balMap.get(secret);
        return balance >= numbers
          ? (balMap.set(secret, balance - numbers), balance - numbers)
          : 'Insufficient Funds'
      }
      inputErrorCounts++;
      mayCallTheCop();
      return 'Incorrect Passwords';
    },
    dispoist(secret, numbers) {
      if (balMap.get(secret)) {
        const balance = balMap.get(secret);
        return (balMap.set(secret, balance + numbers), balance + numbers)
      }
      inputErrorCounts++;
      mayCallTheCop();
      return 'Incorrect Passwords';
    }
  }
}

/** 
 * 赋值和局部状态
 * 练习3.6
*/

function rand() {
  const Init = 1;
  // 假设现在有一个random-update方法，可以根据一个参数生成一个数，然后再根据该数作为参数，又可以生成一个数
  // x1 -> random(x1) -> x2 -> random(x2) -> x3
  let ran = Init;
  return () => ran = randUpdate(ran);
  rand.reset = (value) => ran = value;
  rand.generate = () => this();
}

const random = rand();

function estimatePi (trails) {
  return Math.sqrt(6 / monteCarlo(trails, cesroTest))
}

// 假设rand可以随机生成整数
function cesroTest() {
  return gcd(random(), random()) === 1
}


function monteCarlo(trails, experment) {

  function iterRemainingTrails(remains, passed) {
    if (remains === 0) return passed / trails
    return experment()
      ? iterRemainingTrails(remains - 1, passed + 1)
      : iterRemainingTrails(remains - 1, passed)
  }

  return iterRemainingTrails(trailstrails, 0)
}
