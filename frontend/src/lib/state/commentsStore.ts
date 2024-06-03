import { create } from "zustand"
import { CommentType } from "@/models"

interface State {
  commentsArray: CommentType[]
}

interface Actions {
  setCommentsArray: (comments: CommentType[]) => void
  addComment: (newComment: CommentType) => void
  removeComment: (commentId: string) => void
  changeLikesCount: (commentId: string, likesCount: number) => void
}

export const useCommentsStore = create<State & Actions>((set) => ({
  commentsArray: [],
  setCommentsArray: (comments) => set({ commentsArray: comments }),
  addComment: (newComment) =>
    set((state) => ({
      commentsArray: [newComment, ...state.commentsArray],
    })),
  removeComment: (commentId) =>
    set((state) => ({
      commentsArray: state.commentsArray.filter(
        (comment) => comment.comment_id !== commentId
      ),
    })),
  changeLikesCount: (commentId, likesCount) =>
    set((state) => ({
      commentsArray: state.commentsArray.map((comment) =>
        comment.comment_id === commentId
          ? { ...comment, likesCount: likesCount }
          : comment
      ),
    })),
}))
