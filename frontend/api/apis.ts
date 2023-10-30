import fetcher from './fetcher'
import axios from 'axios'

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL

export type AuthKeys = 'email' | 'password'

export interface AuthBody extends Record<AuthKeys, string> {
  email: string
  password: string
}

export const userRegister = async (data: AuthBody) =>
  axios.post(`${BaseUrl}/user/register`, data, {
    withCredentials: true,
  })

export const userLogin = async (data: AuthBody) =>
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

export const uploadFile = async (data: FormData) =>
  fetcher.post<{ id: string }>('/file/create', data, { headers: { 'Content-Type': 'multipart/form-data' } })

export const getFileDescription = async (id: string) => fetcher.get<{ description: string }>(`/file/description/${id}`)
export const updateFileDescription = async (data: { description: string; id: string }) =>
  fetcher.patch<{ id: string; description: string }>(`/file/update`, data)
