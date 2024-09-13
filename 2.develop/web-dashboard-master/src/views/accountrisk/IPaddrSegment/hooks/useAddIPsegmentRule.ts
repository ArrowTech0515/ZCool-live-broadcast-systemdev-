import formCreate, { type Api } from '@form-create/ant-design-vue'

export default function (fApi: Ref<Api>) {

  return [
    {
      type: 'input',
      field: 'IP',
      title: 'IP段',
      value: '',
      props: {
        placeholder: '请输入IP段',
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
    {
      type: 'input',
      field: 'merch_name',
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
