class Connector {
  constructor(value) {
    this._value = value
  }

  hasValue() {
    return !!this.value
  }

  set value(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  forgetValue(connector, retractor) {

  }
  
}