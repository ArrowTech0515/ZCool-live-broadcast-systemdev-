import { getGuildListReq } from '@/api/public'
import { type Api } from '@form-create/ant-design-vue'

export default function (ps_ratio_disabled = false, requiredPassword = true, fApi: Ref<Api>) {

  let guildList = []
  getGuildListReq().then(res => {
    guildList = res.items.map(item => ({ value: item.guild_id, label: item.guild_name, ps_ratio: item.ps_ratio }))
    formCreate.setData('guildOptions', guildList)
  })

  return [
    {
      type: 'radio',
      field: 'exporting_objects',
      title: '导出对象',
      value: 'all', // Default value set to 'all'
      options: [
        { label: '全部', value: 'all' },
        { label: '按主播', value: 'host' },
      ],
    },
    {
      type: 'input',
      field: 'host_id',
      title: '',
      value: '',
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'radio',
      field: 'export_time',
      title: '提现类型',
      value: 'allTime', // Default to 'allTime'
      options: [
        { label: '全部时间', value: 'allTime' },
        { label: '自定义时间', value: 'customTime' },
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
