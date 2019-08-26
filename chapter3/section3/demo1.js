
function Assert(condtion, errmsg = 'Error Occured') {
  if (!condtion) {
    throw new Error(errmsg)
  }
}

Assert.AssertBit = function(input) {
  this([0, 1].includes(input))
}

// 构造连线
class Wire {
  constructor(signal) {
    this.value = signal;
    this.taskList = [];
  }

  get signal() {
    return this.value;
  }

  set signal(newValue) {
    newValue !== this.value && (
      this.value = newValue,
      Wire.execute(this.taskList)
    )
  }

  addTask(task) {
    this.taskList = [...this.taskList, task];
  }

  static execute(tasks) {
    tasks.forEach(callback => callback && callback());
  }
}

// 构造待处理表
class Agenda {
  constructor(...action) {
    this.list = action;
    this.current = 0;
  }

  isEmpty() {
    return !this.list.length
  }

  first() {
    return this.list[0]
  }

  remove(index = 0) {
    this.list = this.list.slice(index + 1)
  }

  add(time, action){
    setTimeout(action, time);
  }

  current() {
    return this.current;
  }

  propagate() {
    if (this.isEmpty()) {
      return 
    }
    this.first()();
    this.remove();
    return this.propagate();
  }
}

class Action {
  constructor() {
    this.actions = [];
  }

  addAction(action) {
    this.actions = [...this.actions, action]
  }

  static afterDelay(delay, action) {
    setTimeout(() => {
      action();
    }, delay)
  }
}

class OrGate extends Action {
  constructor(input1, input2, output) {
    super();
    this.input = [input1, input2];
    this.output = output;
  }

  orProcedure() {
    const newValue = OrGate.logicalOr(this.input1.signal, this.input2.signal);
    this.output.signal = newValue;
  }

  static logicalOr(input1, input2) {
    Assert.AssertBit(input1);
    Assert.AssertBit(input2);

    return input1 || input2;
  }
}

class AndGate extends Action {
  constructor(input1, input2, output) {
    super();
    this.input = [input1, input2];
    this.output = output;
    this.andProcedure = this.andProcedure.bind(this);
    this.addAction(this.andProcedure);
  }

  andProcedure() {
    const newValue = AndGate.logicalAnd(this.input1.signal, this.input2.signal);
    this.output.signal = newValue;
  }

  static logicalAnd(input1, input2) {
    Assert.AssertBit(input1);
    Assert.AssertBit(input2);

    return input1 && input2;
  }
}

class Inverter extends Action {
  constructor(input, output) {
    super();
    this.input = input;
    this.output = output;
    this.invertInput = this.invertInput.bind(this);
    this.addAction(this.invertInput);
  }
  
  invertInput() {
    const newValue = Inverter.logicalNot(this.input.signal);
    this.output.signal = newValue;
  }

  static logicalNot(s) {
    Assert.AssertBit(s);
    return Number(!s);
  }
}

class HalfAdder extends Action {
  constructor(input1, input2, sum, c) {
    super();
    const d = new Wire();
    const e = new Wire();
    new OrGate(input1, input2, d);
    new AndGate(inpu1, input2, c);
    new Inverter(c, e);
    new AndGate(d, e, sum);
  }
}

class FullAdder extends Action {
  constructor(a, b, cIn, sum, cOut) {
    super();
    const s = new Wire();
    const c1 = new Wire();
    const c2 = new Wire();
    new HalfAdder(b,  cIn, sum, c1);
    new HalfAdder(a, s, sum, c2);
    new OrGate(c1, c2, cOut);
  }
}

const agend = new Agenda();
const INVERTER_DELAY = 2;
const AND_GATE_DELAY = 3;
const OR_GATE_DELAY = 5;

function probe(name, wire, agend) {
  Assert(typeof name === 'string', `The argument ${name} must be a string type`);
  Assert(wire instanceof Wire, `The argument ${wire} must be a Wire type`);

  wire.addTask(() => {
    console.log('\n');
    console.log(`wireName: ${name}`);
    console.log(`currentTime: ${agend.current}`);
    console.log(`newValue: ${wire.signal}`);
    console.log('\n');
  })
}

const input1 = new Wire(0);
const input2 = new Wire(0);

const not = new Inverter(input1, input2);

// const sum = new Wire(0);
// const carry = new Wire(0);

// probe('sum', sum, agend);
// sum.signal = 1;
// probe('carry', carry, agend);
