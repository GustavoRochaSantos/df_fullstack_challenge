import { GetAllResponse, api } from "./baseApi"

const resource = 'post-repost'

const create = async (): Promise<void> => {
  await api.post(resource)
}

const findAll = async (postId: string): Promise<GetAllResponse> => {
  const response = await api.get(`${resource}/${postId}`)
  return response.data
}

const remove = async (postId: string): Promise<void> => {
  await api.delete(`${resource}/${postId}`)
}

export default {
  create, findAll, remove
}