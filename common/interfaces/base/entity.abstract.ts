import ValueObject from "./value-object.abstract";

/*
* Entity
* 
* @generic O - ValueObject type
*/
export default abstract class Entity {
    protected _id: string
  
    constructor() {}
  
    get id() {
      return this._id;
    }
  }