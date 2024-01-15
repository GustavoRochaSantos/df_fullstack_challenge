import React from "react"
import { GetAllResponse, api } from "./baseApi"

const resource = 'post'

export interface Post {
  id?: string,
  text: string,
  photo?: string,
  comments?: number,
  likes?: number,
  reposts?: number,
  views?: number,
  userId?: string
  changedByUser?: string,
  createdAt?: string,
  updatedAt?: string,
  deletedAt?: string,
  isDeleted?: boolean,
  isActive?: boolean,
  isLikedByYou?: boolean
  User?: {
    id: string,
    name: string,
    fullName: string,
    photo: string | undefined
  }
}

const create = async (data: Post): Promise<Post> => {
  const response = await api.post(resource, data)
  return response.data
}

const uploadPhoto = async (id: string, data: Post): Promise<Post> => {
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

const update = async (data: Post): Promise<Post> => {
  const response = await api.patch(`${resource}/${data.id}`, data)
  return response.data
}

const remove = async (id: string): Promise<void> => {
  const response = await api.delete(`${resource}/${id}`)
  return response.data
}

export default {
  create, uploadPhoto, findAll, findOne, findPhoto, update, remove
}