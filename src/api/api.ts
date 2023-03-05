import {instance} from './instance';

export const authApi = {
  async login() {
    const response = await instance.get(`/login`);
    console.log('login :', response);
    return response.data.user;
  },
  async logout() {
    await instance.get(`/logout`);
  },
  async me() {
    const response = await instance.get(`/login/success`);
    console.log('/ :', response);
    return response.data.user;
  },
};
