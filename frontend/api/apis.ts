import fetcher from './fetcher'
import axios from 'axios'

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL

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
  axios.post(`${BaseUrl}/user/register`, data, {
    withCredentials: true,
  })

export const userLogin = async (data: LoginBody) =>
  axios.post(`${BaseUrl}/user/login`, data, {
    withCredentials: true,
  })

export const authUser = async () => axios.get(`${BaseUrl}/info`, { withCredentials: true })

export const getUserInfo = async () => fetcher.get('/user/info')

export const getDiskData = async (locateAt: string | null) => fetcher.get(locateAt ? `/disk?f=${locateAt}` : '/disk')

export const createFolder = async (data: { name: string; locateAt: string | null }) =>
  fetcher.post('/folder/create', data)

export const getBreadCrumb = async (locateAt: string | null) =>
  fetcher.get(locateAt ? `/disk/breadcrumb?id=${locateAt}` : '/disk/breadcrumb')
