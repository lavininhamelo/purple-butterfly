import ValueObject from "../../../common/interfaces/base/value-object.abstract";

export default class TransactionId extends ValueObject<string> {
  constructor(_value: string) {
    super();
    this._value = _value;
  }
}