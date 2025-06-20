import { axiosClassic, instance } from '@/api/axios'

import type { IComment, ICommentData } from '@/types/comment'

const COMMENTS = '/comments'

export const commentService = {
  async byVideoPublicId(publicId?: string | null) {
    try {
      const { data } = await axiosClassic.get<IComment[]>(`${COMMENTS}/by-video/${publicId}`)
      return data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch comments for this video')
    }
  },

  async create(data: ICommentData) {
    try {
      const { data: createdComment } = await instance.post<IComment>(COMMENTS, data)
      return createdComment
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create comment')
    }
  },

  async update(id: string, data: ICommentData) {
    try {
      const { data: updatedComment } = await instance.put<IComment>(`${COMMENTS}/${id}`, data)
      return updatedComment
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update comment')
    }
  },

  async delete(id: string) {
    try {
      const { data: deletedComment } = await instance.delete<IComment>(`${COMMENTS}/${id}`)
      return deletedComment
    } catch (error) {
      console.error(error)
      throw new Error('Failed to delete comment')
    }
  },
}
