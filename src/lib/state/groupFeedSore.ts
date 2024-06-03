import { create } from "zustand"

export type Post = {
  group_post_img: string
  post_id: string
  author_id: string
  author_first_name: string
  author_last_name: string
  content: string
  created_at: string
  image: string
  likes_count: number
}

interface State {
  postsArray: Post[]
}
interface Actions {
  setPostsArray: (posts: Post[]) => void
  addPost: (newPost: Post) => void
  removePost: (postId: string) => void
  changeLikesCount: (postId: string, likesCount: number) => void
}

export const useGroupFeedStore = create<State & Actions>((set) => ({
  postsArray: [],
  setPostsArray: (posts) => set({ postsArray: posts }),
  addPost: (newPost) =>
    set((state) => ({
      postsArray:
        state.postsArray.length > 0
          ? [newPost, ...state.postsArray]
          : [newPost],
    })),
  removePost: (postId) =>
    set((state) => ({
      postsArray: state.postsArray.filter((post) => post.post_id !== postId),
    })),
  changeLikesCount: (postId: string, likesCount: number) =>
    set((state) => ({
      postsArray: state.postsArray.map((post) => {
        if (post.post_id === postId) {
          return {
            ...post,
            likes_count: likesCount,
          }
        }
        return post
      }),
    })),
}))
