import formCreate, { type Api } from '@form-create/ant-design-vue'

export default function (fApi: Ref<Api>) {

  return [
    {
      type: 'input',
      field: 'IP_address',
      title: 'IP地址',
      value: '',
      props: {
        placeholder: '请输入IP地址',
      },
      effect: {
        // fetch: {
        //   action: '/api/v1/usergroup', // Have to fix
        //   to: 'options',
        //   method: 'get',
        //   parse: res => [
        //     { value: 0, label: '分组会员' },
        //     ...res.items.map(item => ({ value: item.groupNumber, label: item.groupName })),
        //   ],
        // },
        required: true,
      },
      wrap: {
        labelCol: {
          span: 6,
        },
      },
    },
    {
      type: 'input',
      field: 'oper_info3',
      title: '备注',
      value: '',
      props: {
        placeholder: '请输入备注',
        type: 'textarea',
      },
      effect: {
        required: true,
      },
      wrap: {
        labelCol: {
          span: 6,
        },
      },
    },
    
  ]
}
