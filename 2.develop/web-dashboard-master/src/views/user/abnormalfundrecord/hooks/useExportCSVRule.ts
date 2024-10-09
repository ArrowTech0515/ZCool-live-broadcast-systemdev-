// import { getGuildListReq } from '@/api/public'
// import { type Api } from '@form-create/ant-design-vue'

export default function (ps_ratio_disabled = false, requiredPassword = true, fApi: Ref<Api>) {

  // let guildList = []
  // getGuildListReq().then(res => {
  //   guildList = res.items.map(item => ({ value: item.guild_id, label: item.guild_name, ps_ratio: item.ps_ratio }))
  //   formCreate.setData('guildOptions', guildList)
  // })
  // console.log("useOrderRule : ", guildList[0])
  return [
    {
      type: 'select',
      field: 'merchant_id',
      title: '导出商户',
      options: [

      ],
      props: {
        placeholder: '所有商户',
        allowClear:true
      },
    },
    {
      type: 'select',
      field: 'application_id',
      title: '导出应用',
      options: [
      ],
      props: {
        placeholder: '所有应用',
        allowClear:true
      },
    },
    {
      type: 'radio',
      field: 'export_time',
      title: '导出时间',
      value: 'allTime', // Default to 'allTime'
      options: [
        { label: '全部时间', value: 'allTime' },
        { label: '自定义时间', value: 'customTime' }
      ],
      on: {
        change: (val) => {

          const selectedValue = val.value || val

          console.log("Selected value (after accessing):", selectedValue)
          console.log("selectedValue.target.value : ", selectedValue.target.value)

          // Show the field depending on the selected radio option
          if (selectedValue.target.value === 'customTime')
            fApi.value.hidden(false, 'join_time')
          else{
            fApi.value.hidden(true, 'join_time')
            console.log("value3 : " + selectedValue)
          }
        },
      },
    },
    {
      type: 'rangePicker',
      field: 'join_time',
      title: '自定义时间',
      value: '',
      props: {
        format: 'YYYY-MM-DD',
        valueFormat: 'X',
        placeholder: ['开始日期', '结束日期'],
      },
      hidden: true, // Initially hidden
    }
  ]
}
