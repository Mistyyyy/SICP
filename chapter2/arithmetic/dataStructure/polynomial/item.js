const { checkSelf } = require('../../util/selfCheck');
const { assert } = require('../../util/assert');
const { add, mul } = require('../../index');

class Item {
  constructor(args) {
    let res;
    try {
      res = new Map(args);
      this.value = res;
    } catch (err) {
      assert(false, err)
    }
  }

  orders() {
    return [...this.value.keys()];
  }

  coffs() {
    return [...this.value.values()];
  }

  add (item) {
    Item.checkSelf(item);
    const maps = new Map(this.value);
    for (const [order, coff] of item.value.entries()) {
      let res = maps.get(order);
      if (res) {
        maps.set(order, add(res, coff));
      } else {
        maps.set(order, coff);
      }
    }
    return new Item(maps);
  }

  mul (item) {
    Item.checkSelf(item);
    const res = new Map();
    const orders = this.orders();
    const anoOrders = item.orders();
    orders.forEach(i => {
      anoOrders.forEach(ano => {
        const totalOrder = i + ano;
        const resCof = mul(this.value.get(i), item.value.get(ano));
        if (res.get(totalOrder)) {
          res.set(totalOrder, add(res.get(totalOrder), resCof));
        } else {
          res.set(totalOrder, resCof);
        }
      })
    })
    return new Item(res);
  }

  static empty(item) {
    this.checkSelf(item);
    const values = item.coffs();
    return values.length === 0 || (values.length === 1 && !!values[0])
  }
}

checkSelf(Item);

module.exports = {
  Item
}