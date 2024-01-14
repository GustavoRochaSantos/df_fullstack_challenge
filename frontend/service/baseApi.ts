import axios from 'axios'

export interface GetAllResponse {
  "data": Record<string, any>[],
  "meta": {
    "total": number,
    "lastPage": number,
    "currentPage": number,
    "perPage": number,
    "prev": number,
    "next": number
  }
}
export const api = axios.create({
  baseURL: 'http://localhost:3001/'
})


api.interceptors.request.use(config => {
  console.log(config.url, config.data)

  return config
})

api.interceptors.response.use(res => {
  console.log(res.status, res.data)

  return res
})