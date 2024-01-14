import { GetAllResponse, api } from "./baseApi"

const resource = 'user'

interface User {
  id?: string,
  name: string,
  email: string,
  photo?: string,
  password?: string
}

const create = async (data: User): Promise<User> => {
  const response = await api.post(resource, data)
  return response.data
}

const uploadPhoto = async (id: string, data: User): Promise<User> => {
  const response = await api.post(`${resource}/upload/${id}`, data)
  return response.data
}

const findAll = async (): Promise<GetAllResponse> => {
  const response = await api.get(resource)
  return response.data
}

const findOne = async (id: string): Promise<GetAllResponse> => {
  const response = await api.get(`${resource}/${id}`)
  return response.data
}

const findPhoto = async (id: string): Promise<GetAllResponse> => {
  const response = await api.get(`${resource}/${id}`)
  return response.data
}

const update = async (id: string, data: User): Promise<User> => {
  const response = await api.put(`${resource}/${id}`, data)
  return response.data
}

const remove = async (id: string): Promise<void> => {
  const response = await api.delete(`${resource}/${id}`)
  return response.data
}

export default {
  create, uploadPhoto, findAll, findOne, findPhoto, update, remove
}