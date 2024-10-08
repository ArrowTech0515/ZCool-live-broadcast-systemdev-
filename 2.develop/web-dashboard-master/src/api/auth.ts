import { get, post } from '../utils/request'

export interface IUser {
  username: string
  sex: 1 | 2
  role: string
  email: string
  id: string
  nickName: string
  status: 0 | 1
  phone: string
}
export interface LoginRes extends IUser {
  access_token: string
  refresh_token: string
  expires_in: number
}
interface LoginParams {
  username: string
  password: string
  code: string
}
// 菜单
export interface IMenu {
  title: string
  path: string
  url?: string
  icon?: Iconfont
  type?: number
  hide?: boolean
  children?: IMenu[]
  [K: string]: any
}

export const loginRequest = (params: LoginParams) =>
  post<LoginRes, LoginParams>('/api/v1/system/login', params, {
    skipCheckAuth: true,
    skipShowTips: true,
  })

export const getMenusRequest = (params?) => get<IMenu[]>('/api/v1/system/menus', params)
