/*
* Entity
*/
export default abstract class Entity {
    protected _id: string
  
    constructor() {}
  
    get id() {
      return this._id;
    }
  }