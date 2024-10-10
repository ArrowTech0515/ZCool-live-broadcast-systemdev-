import { getGuildListReq } from '@/api/public'
import { type Api } from '@form-create/ant-design-vue'
// import createUploadRule from '@/rules/createUploadRule'

//const uploadRule = createUploadRule('主播头像', 'avatar_url')
 export default function (record:any, fApi: Ref<Api>) {

  let guildList = []
  getGuildListReq().then(res => {
    guildList = res.items.map(item => ({ value: item.guild_id, label: item.guild_name, ps_ratio: item.ps_ratio }))
    formCreate.setData('labelOptions', guildList)
  })

  return [
    {
      type: 'select',
      field: 'banker_name',
      title: '银商名称',
      props: {
        placeholder: '请选择银商名称', // Add placeholder
      },
      effect: {
        fetch: {
          action: '/api/v1/source/banker_name',
          to: 'options',
          method: 'get',
          parse: res => [
            { value: 0, label: '所有来源' },
            ...res.items.map(item => ({ value: item.source_id, label: item.source_name })),
          ],
        },
      },
    },
    {
      type: 'select',
      field: 'bank_name',
      title: '银行名称',
      props: {
        placeholder: '请选择银行名称', // Add placeholder
      },
      effect: {
        fetch: {
          action: '/api/v1/source/bank_name',
          to: 'options',
          method: 'get',
          parse: res => [
            { value: 0, label: '所有来源' },
            ...res.items.map(item => ({ value: item.source_id, label: item.source_name })),
          ],
        },
      },
    },
    {
      type: 'select',
      field: 'bank_card_number',
      title: '银行卡号',
      props: {
        placeholder: '请选择银行卡号', // Add placeholder
      },
      effect: {
        fetch: {
          action: '/api/v1/source/bank_card_number',
          to: 'options',
          method: 'get',
          parse: res => [
            { value: 0, label: '所有来源' },
            ...res.items.map(item => ({ value: item.source_id, label: item.source_name })),
          ],
        },
      },
    },
    {
      type: 'input',
      field: 'user_id',
      title: '用户ID',
      value: '',
      props: {
        placeholder: '请输入用户ID', // Add placeholder
      },
    },
    {
      type: 'input',
      field: 'order_number',
      title: '订单号',
      value: '',
      props: {
        placeholder: '请输入订单号', // Add placeholder
      },
    },
    {
      type: 'select',
      field: 'order_status',
      title: '订单状态',
      value: 1,
      props: {
        placeholder: '请选择订单状态', // Add placeholder
      },
      options: Object.keys(ENUM.success_status).map(key => ({ value: parseInt(key), label: ENUM.success_status[key] })),
    },
    {
      type: 'rangePicker',
      field: 'created_time',
      title: '时间',
      value: '',
      className: 'form-time-picker',
      props: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'X',
      },
    },
  ]
}

