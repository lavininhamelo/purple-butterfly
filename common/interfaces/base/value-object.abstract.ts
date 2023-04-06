export default abstract class ValueObject<T> {
  protected _value: T;

  constructor() {
  }

  get value(): T {
    return this._value;
  }
}
