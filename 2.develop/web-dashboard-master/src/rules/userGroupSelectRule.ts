export default {
  type: 'select',
  field: 'groupNumber',
  title: '分组会员',
  value: '',
  options: [],
  
  props: {
    placeholder: '请选择',
    allowClear:true
  },

  effect: {
    fetch: {
      action: '/api/v1/user/group', // Have to fix
      to: 'options',
      method: 'get',
      parse: res => [
        { value: 0, label: '分组会员' },
        ...res.items.map(item => ({ value: item.groupNumber, label: item.groupName })),
      ],
    },
    required: true,
  },
  wrap: {
    labelCol: {
      span: 5,
    },
  },
}
