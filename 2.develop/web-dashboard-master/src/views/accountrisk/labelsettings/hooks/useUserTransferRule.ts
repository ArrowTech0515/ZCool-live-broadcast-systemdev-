import formCreate, { type Api } from '@form-create/ant-design-vue'

export default function (fApi: Ref<Api>) {

  return [
    {
      type: 'input',
      field: '_user',
      title: '待转移用户数',
      value: '',
      props: {
        placeholder: '请输入待转移用户数',
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
    {
      type: 'select',
      field: '_number_',
      title: '请选择新标签',
      props: {
        placeholder: '请选择',
      },
      wrap: {
        labelCol: {
          span: 6,
        },
      },
    },
  ]
}
