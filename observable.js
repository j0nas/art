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
    }
  }

  get() {
    return this._value;
  }

  set(value) {
    this._value = value;
    this._changeListeners.forEach(listener => listener(this._value))
    this._setInterval(this._value)
  }

  addListener(listener) {
    this._changeListeners.push(listener);
  }
}