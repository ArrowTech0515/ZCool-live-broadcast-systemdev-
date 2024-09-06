import { getGuildListReq } from '@/api/public'
import { type Api } from '@form-create/ant-design-vue'

export default function (record: any, fApi: Ref<Api>) {

  let guildList = []
  getGuildListReq().then(res => {
    guildList = res.items.map(item => ({ value: item.guild_id, label: item.guild_name, ps_ratio: item.ps_ratio }))
    formCreate.setData('guildOptions', guildList)
  })
  console.log("useOrderRule : ", guildList[0])
  return [
    {
      type: 'input',
      field: 'user_id',
      title: '用户ID',
      value: record.user_id,
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'input',
      field: 'nick_name',
      title: '用户昵称',
      value: record.user_nickname,
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'input',
      field: 'complain',
      title: '投诉内容',
      value: '',
      props: {
        placeholder: '请输入备注信息',
        type: 'textarea',
      },
    },
  ]
}
