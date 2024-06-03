"use client"

import { useProfilePostStore } from "@/lib/state/profilePostStore"

export const removePostHandler = (postId: string) => {
    useProfilePostStore.getState().removePost(postId)
  }