import { getGuildListReq } from '@/api/public'
import { type Api } from '@form-create/ant-design-vue'

export default function (ps_ratio_disabled = false, requiredPassword = true, fApi: Ref<Api>) {

  let guildList = []
  getGuildListReq().then(res => {
    guildList = res.items.map(item => ({ value: item.guild_id, label: item.guild_name, ps_ratio: item.ps_ratio }))
    formCreate.setData('guildOptions', guildList)
  })
  console.log("useOrderRule : ", guildList[0])

  return [
    {
      type: 'select',
      field: 'merchant_id',
      title: '导出对象',
      value: '',
      options: [],
      props: {
        // placeholder: '所有商户',
         allowClear:false
      },
    },
    {
      type: 'select',
      field: 'application_id',
      title: '导出应用',
      value: '',
      options: [

      ],
      props: {
        placeholder: '所有应用',
        allowClear:true
      },
    },
    {
      type: 'radio',
      field: 'exporting_objects',
      title: '导出对象',
      value: 'all', // Default value set to 'all'
      options: [
        { label: '全部', value: 'all' },
        { label: '按主播', value: 'host' },
        { label: '按工会', value: 'guild' },
      ],
      on: {
        change: (val) => {
          // First hide all dependent fields

      console.log("on change2 : fApi = " + fApi.value)


          fApi.value.hidden(true, 'host_id');
          fApi.value.hidden(true, 'guild_name');

          const selectedValue = val.value || val;

          console.log("Selected value (after accessing):", selectedValue);
          console.log("selectedValue.target.value : ", selectedValue.target.value);

          // Show the field depending on the selected radio option
          if (selectedValue.target.value === 'host') {
            fApi.value.hidden(false, 'host_id');
            console.log("value2 : " + selectedValue);

          } else if (selectedValue.target.value === 'guild') {
            fApi.value.hidden(false, 'guild_name');
            console.log("value3 : " + selectedValue);
          }
        },
      },
    },
    {
      type: 'input',
      field: 'host_id',
      title: '主播ID',
      value: '',
      props: {
        placeholder: '请输入',
      },
      hidden: true, // Hidden by default
    },
    {
      type: 'select',
      field: 'guild_name',
      title: '工会名称',
      value: '请选择工会',
      options: [],  // Populated dynamically
      props: {
        placeholder: '请选择工会',
      },
      hidden: true, // Hidden by default
    },
    {
      type: 'select',
      field: 'export_type',
      title: '导出类型',
      value: '请选择导出类型',
      options: [],
      props: {
        placeholder: '请选择导出类型',
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
      // on: {
      //   change: (val) => {
      //     if (val === 'customTime') {
      //       fApi.value.show('join_time');
      //     } else {
      //       fApi.value.hide('join_time');
      //     }
      //   },
      // },
    },
    {
      type: 'rangePicker',
      field: 'join_time',
      title: '',
      value: '',
      props: {
        format: 'YYYY-MM-DD',
        valueFormat: 'X',
        placeholder: ['开始日期', '结束日期'],
      },
      hidden: false, // Hidden by default
    }
  ]
}
