const { assert } = require('../util/assert');

function raiseFromOriginTo(origin, prev, next) {
  origin.prev = prev;
  origin.next = next;
}

function insertAfter(insert, prev) {
  assert(prev !== null, `The argument must not be null`);
  const temp = prev.next;
  prev.next = insert;
  insert.prev = prev;
  insert.next = temp;
  if (temp) {
    temp.prev = insert;
  }
}

function insertBefore(insert, next) {
  assert(next !== null, `The argument must not be null`);
  const temp = next.prev;
  next.prev = insert;
  insert.next = next;
  insert.prev = temp;
  if (temp) {
    temp.next = insert;
  }
}

// 先解决优先级问题，即不同的层次结构中，哪一个数据结构的优先级高？
// 两个数据中肯定有优先级高的一个，这时候，解决方法是两边数据结构向中间靠拢
// 即一个取 prev，一个取 next 
// 返回值是最低优先级
function takeHighLevel(obj1, obj2) {
  const constructor1 = obj1.constructor;
  const constructor2 = obj2.constructor;

  // 表示两个都是最低级或者最高级或者相同
  if (
    (!constructor1.prev && !constructor2.prev)
    || (!constructor1.next && !constructor2.next)
    || (constructor1 === constructor2)
  ) {
    return true;
  }

  // obj1 最低优先级，即处于塔的底层
  if (!constructor1.prev) {
    return [obj1, obj2];
  }

  // obj2 最低优先级，即处于塔的底层
  if (!constructor2.prev) {
    return [obj2, obj1];
  }

  // obj1 最高优先级，即处于塔的顶层
  if (!constructor1.next) {
    return [obj2, obj1];
  }

  // obj2 最高优先级，即处于塔的顶层
  if (!constructor2.next) {
    return [obj1, obj2];
  }

  // 两端情况已经考虑完毕或者相同情况考虑完毕
  // 假设 obj1 的优先级低于 obj2

  while(true) {
    const next = constructor1.next;

    if (next === constructor2) {
      return [obj1, obj2]
    }

    if (next === null) {
      break;
    }
  }

  return [obj2, obj1];
}

function raiseTo(lower, higher) {
  const targetType = higher.constructor; // target type
  let current = lower.constructor, raise, target = lower;
  while(true) {
    current = current.next;
    raise = target.raise();
    target = current.take(raise);
    if (current === targetType) {
      break;
    }
  }
  return [target, higher];
}

function raise(arg1, arg2) {
  const lower = takeHighLevel(arg1, arg2);
  if (lower === true) {
    return [arg1, arg2];
  }

  const [res1, res2] = raiseTo(...lower);

  return [res1, res2];
}

// 明显是一个递归式
// 终止条件是当 args.down() 为false 或者 args.constructor.prev 为null的时候
function down(args) {
  function autoDown(args) {
    const prev = args.constructor.prev;
    const newArgs = args.down();

    if (!newArgs) {
      return args;
    }

    if (!prev) {
      return args;
    }
    const passArgs = prev.take(newArgs);
    return autoDown(passArgs);
  }
  return autoDown(args);
}

module.exports = {
  raise,
  down,
  insertAfter,
  insertBefore,
  raiseFromOriginTo,
}