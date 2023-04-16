import Entity from "../../../common/interfaces/base/entity.abstract";

export default abstract class Content extends Entity {
    content: string;
    likes: number;
    dislikes: number;
    authorReference: string;
    ownerReference: string;
    comments: Comment[];
    date: string;

    constructor(id: string, content: string, authorReference: string) {
        super();
        this._id = id;
        this.content = content;
        this.likes = 0;
        this.dislikes = 0;  
        this.comments = [];
        this.ownerReference = authorReference
        this.authorReference = authorReference
        this.date = new Date().toISOString();
    }

    transferOwnership(newOwnerReference: string) {
        this.ownerReference = newOwnerReference;
    }
}
