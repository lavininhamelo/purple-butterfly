import Content from "./content.entity";

export default class Post extends Content {
    constructor(id: string, content: string, authorReference: string) {
        super(id, content, authorReference);
    }
}