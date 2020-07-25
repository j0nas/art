class Observable {
  _value;
  _intervalFn;
  _intervalHandler;
  _changeListeners = [];

  _setInterval() {
    if (this._intervalHandler) {
      clearInterval(this._intervalHandler);
    }

    this._intervalHandler = setInterval(this._intervalFn, this._value);
  }

  constructor(value, config) {
    this._value = value;
    if (config) {
      if (config.intervalFn) {
        this._intervalFn = config.intervalFn;
        this._setInterval();
      }
      if (config.name) { this._name = config.name; }
    }
  }

  get value() { return this._value; }
  set value(value) {
    this._value = value;
    this._changeListeners.forEach(listener => listener(this._value))
    this._setInterval(this.value)
    console.log(`Set ${this.name} to ${this.value}`)
  }

  get name() {
    return this._name;
  }

  addListener(listener) {
    this._changeListeners.push(listener);
  }
}
