import ValueObject from "../../../common/interfaces/base/value-object.abstract";

export default class TransactionKey extends ValueObject<string> {
  constructor(_value: string) {
    super();
    this._value = _value;
  }
}