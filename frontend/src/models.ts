
export type CommentType = {
    comment_id:string
    content:string
    author_first_name:string
    author_last_name:string
    image:string
    comment_created_at:string
    author_avatar:string
    handleDeleteComment:(commentID:string) =>void
    likes_count:number
}