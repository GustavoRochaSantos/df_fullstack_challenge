import { api } from "./baseApi"

const resource = 'auth'

interface Login {
  login: string,
  password: string
}

export interface Tokens {
  access_token?: string,
  refresh_token?: string
}

const login = async (data: Login): Promise<Tokens> => {
  const response =
    await api.post(`${resource}/login`, data)

  return response.data
}


const refreshToken = async (data: any): Promise<Tokens> => {
  const response =
    await api.post(`${resource}/refreshToken`, data)

  return response.data
}

const me = async (): Promise<void> => {
  const response =
    await api.get(`${resource}/profile`)

  return response.data
}

export default { login, refreshToken, me }