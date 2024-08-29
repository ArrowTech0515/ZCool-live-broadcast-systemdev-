import { get, post, put } from '../utils/request'

export const getUserGroupListReq = (params?) => get('/api/v1/usergroup', params)
export const getUserGroupLogListReq = (group_id, params) => get('/api/v1/usergroup/logs/device/' + group_id, params)
export const setUserGroupRemarkReq = (group_id, data) => post('/api/v1/usergroup/set/remark/' + group_id, data)
export const setBlackReq = data => put('/api/v1/usergroup/set/blacklist', data)
export const setMuteReq = data => put('/api/v1/usergroup/set/mute', data)

// 标签
export const setUserGroupTagsReq = data => put('/api/v1/usergroup/tags', data)

// 获取某个用户的标签列表
export const getUserGroupTagsReq = (group_id) => get('/api/v1/usergroup/tags/' + group_id)

// 生成 user_id
export const createUserGroupIdReq = () => get('/api/v1/usergroup/gen/groupid')


// 添加与编辑
// id 为 null 时为添加
export const userGroupAddOrEditReq = (id, data) => {
  if (id) {
    return post('/api/v1/usergroup/' + id, data)
  } else {
    return post('/api/v1/usergroup', data)
  }
}

// 重置密码
export const resetPasswordReq = group_id => put('/api/v1/usergroup/reset/password/' + group_id)
