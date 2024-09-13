import formCreate, { type Api } from '@form-create/ant-design-vue'

export default function (ps_ratio_disabled = false, requiredPassword = true, fApi: Ref<Api>) {

  return [
    {
      type: 'input',
      field: 'merch_name',
      title: '商户名称',
      value: '',
      props: {
        placeholder: '请输入商户名称',
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
      title: '商户名称',
      value: '',
      props: {
        placeholder: '请输入商户名称',
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
