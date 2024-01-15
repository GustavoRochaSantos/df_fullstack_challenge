import { GetAllResponse, api } from "./baseApi"

const resource = 'post-comment'

export interface PostComment {
  id?: string,
  text: string,
  userId?: string
  postId: string,
  replayCommentId?: string,
  changedByUser?: string,
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: Date,
  isDeleted?: boolean,
  isActive?: boolean,
}

const create = async (data: PostComment): Promise<PostComment> => {
  const response = await api.post(resource, data)
  return response.data
}

const findAll = async (query: string): Promise<GetAllResponse> => {
  const response = await api.get(`${resource}?${query}`)
  return response.data
}

const findOne = async (postCommentId: string): Promise<GetAllResponse> => {
  const response = await api.get(`${resource}/${postCommentId}`)
  return response.data
}

const update = async (postCommentId: string, data: PostComment): Promise<PostComment> => {
  const response = await api.put(`${resource}/${postCommentId}`, data)
  return response.data
}

const remove = async (postCommentId: string): Promise<void> => {
  const response = await api.delete(`${resource}/${postCommentId}`)
  return response.data
}

export default {
  create, findAll, findOne, update, remove
}