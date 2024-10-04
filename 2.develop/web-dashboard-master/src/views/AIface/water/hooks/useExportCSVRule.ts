import { getGuildListReq } from '@/api/public'

export default function (fApi: Ref<Api>) {

  let guildList = []
  getGuildListReq().then(res => {
    guildList = res.items.map(item => ({ value: item.guild_id, label: item.guild_name, ps_ratio: item.ps_ratio }))
    formCreate.setData('guildOptions', guildList)
  })
  console.log("useOrderRule : ", guildList[0])
  return [
    {
      type: 'radio',
      field: 'merchant_id',
      title: '导出对象',
      value: 1,
      options: Object.keys(ENUM.exporting_objects2).map(key => ({ label: ENUM.exporting_objects2[key], value: parseInt(key) })),
      props: {
        placeholder: '所有商户',
        allowClear:true
      },
      on: {
        change: (val) => {

          const selectedValue = val.value || val

          console.log("Selected value (after accessing):", selectedValue)
          console.log("selectedValue.target.value : ", selectedValue.target.value)
       
          fApi.value.hidden(true, 'export_type')
          fApi.value.hidden(true, 'export_type2')

          // Show the field depending on the selected radio option
          if (selectedValue.target.value === 2) {
            fApi.value.hidden(false, 'export_type')
          }
          else if(selectedValue.target.value === 3) {
            fApi.value.hidden(false, 'export_type2')
          }
          else {
            console.log("value3 : " + selectedValue)
          }
        },
      },
    },
    {
      type: 'input',
      field: 'export_type',
      title: '主播ID',
      props: {
        placeholder: '请输入主播ID',
      },
      // wrap: {
      //   labelCol: { span: 6 },
      // },
      hidden: true, // Initially hidden
    },
    {
      type: 'input',
      field: 'export_type2',
      title: '人脸名称',
      props: {
        placeholder: '请输入人脸名称',
      },
      // wrap: {
      //   labelCol: { span: 6 },
      // },
      hidden: true, // Initially hidden
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
      title: '时间',
      props: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'X',
        placeholder: ['开始时间', '结束时间'],
      },
      hidden: true, // Initially hidden
      // wrap: {
      //   labelCol: { span: 6 },
      // },
    }
  ]
}
