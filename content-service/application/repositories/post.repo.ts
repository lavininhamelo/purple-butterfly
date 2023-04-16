import Post from "../../domain/entities/post.entity";

export interface PostRepository {
    save(post: Post): Promise<boolean>;
}