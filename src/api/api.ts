import { instance } from './instance'

export const authApi = {
  async login(data: LoginType) {
    return await instance.post(`/auth/login`, data)

  },
  me() {
    return instance.get(`/auth/me`)
  }
}

export type LoginType = {
  email: string
  password: string
}




