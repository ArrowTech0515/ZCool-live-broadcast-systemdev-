import { getGuildListReq } from '@/api/public'
import { type Api } from '@form-create/ant-design-vue'
// import createUploadRule from '@/rules/createUploadRule'

//const uploadRule = createUploadRule('主播头像', 'avatar_url')
 export default function (ps_ratio_disabled = false, requiredPassword = true, fApi: Ref<Api>) {

  let guildList = []
  getGuildListReq().then(res => {
    guildList = res.items.map(item => ({ value: item.guild_id, label: item.guild_name, ps_ratio: item.ps_ratio }))
    formCreate.setData('labelOptions', guildList)
  })

  return [
    //uploadRule,
    {
      type: 'select',
      field: 'guild_id',
      title: '导出对象',
      value: '',
      options: [],
      props: {
        placeholder: '所有商户',
      },
      effect: {
        loadData: {
          attr: 'labelOptions',
          to: 'options'
        },
      },
      on: {
        // change(val) {
          // const ps_ratio = guildList.find(item => item.value === val)?.ps_ratio
          // if (ps_ratio) {
          //   nextTick(() => {
          //     fApi.value.setValue({
          //       ps_ratio,
          //     })
          //     fApi.value.mergeRules({
          //       'ps_ratio': { props: { disabled: true } }
          //     })
          //   })
          // } else {
          //   nextTick(() => {
          //     fApi.value.updateRule({
          //       'ps_ratio': { props: { disabled: ps_ratio_disabled || false } }
          //     })
          //   })
          // }
        // }
      },
    },
    {
      type: 'select',
      field: 'guild_id',
      title: '导出应用',
      value: '请选择导出类型',
      options: [],
      props: {
        placeholder: '所有应用',
      },
      effect: {
        loadData: {
          attr: 'labelOptions',
          to: 'options'
        },
      },
      on: {
        // change(val) {
        //   const ps_ratio = guildList.find(item => item.value === val)?.ps_ratio
        //   if (ps_ratio) {
        //     nextTick(() => {
        //       fApi.value.setValue({
        //         ps_ratio,
        //       })
        //       fApi.value.mergeRules({
        //         'ps_ratio': { props: { disabled: true } }
        //       })
        //     })
        //   } else {
        //     nextTick(() => {
        //       fApi.value.updateRule({
        //         'ps_ratio': { props: { disabled: ps_ratio_disabled || false } }
        //       })
        //     })
        //   }
        // }
      },
    },
    {
      type: 'radio',
      field: 'export_time',
      title: '导出时间',
      value: 1,
      options: Object.keys(ENUM.export_time).map(key => ({ label: ENUM.export_time[key], value: parseInt(key) })),
      effect: {
        required: true
      }
    },
    {
      type: 'rangePicker',
      field: 'join_time',
      title: '',
      value: '',
      props: {
        format: 'YYYY-MM-DD',
        valueFormat: 'X',
      },
      wrap: {
        class: 'range-picker-right' // Add this class to the wrapper
      },
    },
    //merchRelRule,
  ]
}

