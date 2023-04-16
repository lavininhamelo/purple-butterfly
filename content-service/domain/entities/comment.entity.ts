import Content from "./content.entity";

export default class Comment extends Content {
    postId: string;

    constructor(id: string, content: string, authorReference: string, postId: string) {
        super(id, content, authorReference);
        this.postId = postId;
    }
}