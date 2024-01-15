import axios from 'axios'
import { off } from 'process'
import { AuthService } from '.'

export interface MutationError {
  code: string,
  message: string,
  name: string,
  response: {
    data: {
      error: string,
      message: string,
      statusCode: number
    }
  }
}
export interface GetAllResponse {
  "data": any[],
  "meta": {
    "total": number,
    "lastPage": number,
    "currentPage": number,
    "perPage": number,
    "prev": number,
    "next": number
  }
}

interface Tokens {
  access_token: string,
  refresh_token: string
}
export const api = axios.create({
  baseURL: 'http://localhost:3001/'
})



api.interceptors.request.use(config => {
  console.log(config.url, config.method, config.data)
  if (!config.url?.includes('login')) {

    const tokens = JSON.parse(localStorage.getItem('tokens') || "")

    config.headers.Authorization = `Bearer ${tokens.access_token}`
  }
  return config
})

api.interceptors.response.use((res) => {
  console.log(res.status, res.data, res.statusText)

  return res
},
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      localStorage.getItem("tokens")
    ) {
      const tokens: Tokens = JSON.parse(localStorage.getItem("tokens") || "");
      const data = JSON.stringify({
        refresh_token: tokens.refresh_token,
      });

      AuthService.refreshToken({
        refresh_token: tokens.refresh_token,
      })
        .then((response) => {
          localStorage.setItem("tokens", JSON.stringify(response));
          originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
          api(originalRequest)
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Return the original error if we can't handle it
    return Promise.reject(error);
  })