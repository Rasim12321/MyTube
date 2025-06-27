import { axiosClassic, instance } from '@/api/axios'

import type { IComment, ICommentData } from '@/types/comment'

const COMMENTS = '/comments'

export const commentService = {
  async byVideoPublicId(publicId?: string | null) {
    const { data } = await axiosClassic.get<IComment[]>(`${COMMENTS}/by-video/${publicId}`)
    return data
  },

  async create(data: ICommentData) {
    const { data: createdComment } = await instance.post<IComment>(COMMENTS, data)
    return createdComment
  },

  async update(id: string, data: ICommentData) {
    const { data: updatedComment } = await instance.put<IComment>(`${COMMENTS}/${id}`, data)
    return updatedComment
  },

  async delete(id: string) {
    const { data: deletedComment } = await instance.delete<IComment>(`${COMMENTS}/${id}`)
    return deletedComment
  },
}
