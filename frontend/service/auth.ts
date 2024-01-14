import { api } from "./baseApi"

const resource = 'auth'

interface Login {
  login: string,
  password: string
}

const login = async (data: Login): Promise<void> => {
  await api.post(resource, data)
}

export default { login }