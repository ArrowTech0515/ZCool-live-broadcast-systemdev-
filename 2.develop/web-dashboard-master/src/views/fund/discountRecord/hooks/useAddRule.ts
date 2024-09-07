import { getGuildListReq } from '@/api/public'
import { type Api } from '@form-create/ant-design-vue'

export default function (ps_ratio_disabled = false, requiredPassword = true, fApi: Ref<Api>) {

  let guildList = []
  getGuildListReq().then(res => {
    guildList = res.items.map((item: { guild_id: any; guild_name: any; ps_ratio: any }) => ({ value: item.guild_id, label: item.guild_name, ps_ratio: item.ps_ratio }))
    formCreate.setData('guildOptions', guildList)
  })
  console.log("useOrderRule : ", guildList[0])

  return [
    {
      type: 'input',
      field: 'user_id',
      title: '用户ID',
      value: '',
      props: {
         placeholder: '请输入用户ID',
      },
    },
    {
      type: 'input',
      field: 'nickname',
      title: '用户昵称',
      value: '',
      props: {
         placeholder: '请输入用户昵称',
      },
    },
    {
      type: 'select',
      field: 'activity_name',
      title: '活动名称',
      props: {
        placeholder: '请选择活动名称', // Add placeholder
      },
    },
    {
      type: 'input',
      field: 'bonusAmountOrRate',
      title: '優惠金額/比例',
      value: '',
      props: {
         placeholder: '请输入優惠金額/比例',
      },
    },
    {
      type: 'select',
      field: 'prize_type',
      title: '派獎類型',
      options: [
      ],
      props: {
        placeholder: '请选择派獎類型',
        allowClear:true
      },
    },
    {
      type: 'input',
      field: 'washMultiple',
      title: '洗碼倍數',
      value: '',
      props: {
         placeholder: '请输入洗碼倍數',
      },
    },
  ]
}
