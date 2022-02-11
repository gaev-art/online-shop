import {instance} from './instance'

export const authApi = {
    async login() {
        const response = await instance.get(`/login`)
        console.log('login :', response)
        return response.data.user
    },
    async logout() {
        const response = await instance.get(`/logout`)
        console.log('logout :', response)
        return response.data.user
    },
    async me() {
        const response = await instance.get(`/login/success`)
        console.log('/ :', response)
        return response.data.user
    }
}





