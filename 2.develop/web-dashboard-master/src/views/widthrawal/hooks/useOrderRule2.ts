import { getGuildListReq } from '@/api/public'
import { type Api } from '@form-create/ant-design-vue'

export default function (ps_ratio_disabled = false, requiredPassword = true, fApi: Ref<Api>) {

  let guildList = []
  getGuildListReq().then(res => {
    guildList = res.items.map(item => ({ value: item.guild_id, label: item.guild_name, ps_ratio: item.ps_ratio }))
    formCreate.setData('guildOptions', guildList)
  })

  return [
    // {
    //   type: 'pagination',  // Component type
    //   field: 'custom_pagination',  // Field identifier
    //   title: 'Custom Pagination',  // Component title
    //   value: 1,  // Initial value for the current page
    //   props: {
    //     total: 50,  // Total items
    //     pageSize: 10,  // Items per page
    //     showSizeChanger: true,  // Allow changing page size
    //     showQuickJumper: true,  // Allow quick jump to a specific page
    //     placeholder: 'Select page number',  // Placeholder (usually not needed for pagination)
    //   },
    //   events: {
    //     change: (page) => {
    //       console.log('Page changed to:', page);
    //     },
    //     prev: () => {
    //       console.log('Previous page');
    //     },
    //     next: () => {
    //       console.log('Next page');
    //     },
    //   },
    // },    
   
    {
      type: 'slider',
      field: 'join_time',
      title: '银行卡手续费',
      value: '',
      wrap: {
        labelCol: { span: 6 },
      },
   },
    
    {
      type: 'slider',
      field: 'join_time',
      title: '虚拟币手续费',
      value: '',
      wrap: {
        labelCol: { span: 6 },
      },
    }
  ]
}
