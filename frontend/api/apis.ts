import fetcher from './fetcher'
import axios from 'axios'

export type RegisterKeys = 'email' | 'password'

export interface RegisterBody extends Record<RegisterKeys, string> {
  email: string
  password: string
}

export type LoginKeys = 'email' | 'password'

export interface LoginBody extends Record<LoginKeys, string> {
  email: string
  password: string
}

export const register = async (data: RegisterBody) =>
  axios.post(`http://localhost:8080/user/register`, data, {
    withCredentials: true,
  })

export const login = async (data: LoginBody) =>
  axios.post(`http://localhost:8080/user/login`, data, {
    withCredentials: true,
  })

export const getUserInfo = async () => fetcher.get('/user/userinfo')

export const createFolder = async (data: { folder_name: string; locate_at: string | null }) =>
  fetcher.post('/folder', data)
