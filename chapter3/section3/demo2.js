const INVERTER_DELAY = 200;
const AND_GATE_DELAY = 300;
const OR_GATE_DELAY = 500;
const agend = {
  time:  0
}

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
    this.initial = true;
    this.value = signal;
    this.taskList = [];
  }

  get signal() {
    return this.value;
  }

  set signal(newValue) {
    (newValue !== this.value || this.initial) &&  (
      this.value = newValue,
      this.initial = false,
      Wire.execute(this.taskList)
    )
  }

  addAction(task, delay) {
    this.taskList = [...this.taskList, { task, delay }];
  }

  static afterDelay(task, delay) {
    setTimeout(() => {
      agend.time += delay;
      task();
    }, delay);
  }

  static execute(tasks) {
    tasks.forEach(({ task, delay }) => {
      Assert(typeof task === 'function', `The ${task} must be a function`);
      if (delay) {
        return this.afterDelay(task, delay);
      } else {
        return task(); 
      }
    });
  }
}

class Inverter {
  constructor(input, output) {
    this.input = input;
    this.output = output;
    this.invertInput = this.invertInput.bind(this);
    this.input.addAction(this.invertInput, new.target.delay);
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

Inverter.delay = INVERTER_DELAY;

class AndGate {
  constructor(input1, input2, output) {
    this.input1 = input1;
    this.input2 = input2;
    this.output = output;
    this.andInput = this.andInput.bind(this);
    this.input1.addAction(this.andInput, new.target.delay);
    this.input2.addAction(this.andInput, new.target.delay);
  }

  andInput() {
    const newValue = AndGate.logicalAnd(this.input1.signal, this.input2.signal);
    this.output.signal = newValue;
  }

  static logicalAnd(s1, s2) {
    Assert.AssertBit(s1);
    Assert.AssertBit(s2);
    return s1 && s2;
  }
}

AndGate.delay = AND_GATE_DELAY;

class OrGate {
  constructor(input1, input2, output) {
    this.input1 = input1;
    this.input2 = input2;
    this.output = output;
    this.orInput = this.orInput.bind(this);
    this.input1.addAction(this.orInput, new.target.delay);
    this.input2.addAction(this.orInput, new.target.delay);
  }

  orInput() {
    const newValue = OrGate.logicalOr(this.input1.signal, this.input2.signal);
    this.output.signal = newValue;
  }

  static logicalOr(s1, s2) {
    Assert.AssertBit(s1);
    Assert.AssertBit(s2);
    return s1 || s2;
  }
}

OrGate.delay = OR_GATE_DELAY;

class HalfAdder {
  constructor(input1, input2, sum, c) {
    const d = new Wire(0);
    const e = new Wire(0);
    new OrGate(input1, input2, d);
    new AndGate(input1, input2, c);
    new Inverter(c, e);
    new AndGate(d, e, sum);
  }
}

// 检测线路信号的变化，并给出时钟间隔

function propb(name, wire) {
  wire.addAction(
    () => console.log(`
    wireName: ${name},
    currentTime: ${agend.time},
    newValue: ${wire.signal}
  `)
  )
}

const input1 = new Wire(0);
const input2 = new Wire(0);
const sum = new Wire(0);
const carry = new Wire(0);
propb('sum', sum);
propb('carry', carry);
new HalfAdder(input1, input2, sum, carry);

input1.signal = 1;

// setTimeout(() => {
//   input2.signal = 1;
// },  1200)

// const input1 = new Wire(0);
// const input2 = new Wire(0);
// const output1 = new Wire(0);
// const output2 = new Wire(0);
// const input3 = new Wire(0);

// propb('andOut', output2);
// propb('notWire', output1)

// // const not1 = new Inverter(input1, output1);
// // const not2 = new Inverter(output1, output2);
// const andwire = new AndGate(input1, input2, output2);
// const notwire = new Inverter(output2, output1);
// input2.signal = 0;