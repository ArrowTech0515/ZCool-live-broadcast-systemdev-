import formCreate, { type Api } from '@form-create/ant-design-vue'
import createUploadRule from '@/rules/createUploadRule'

export default function (ps_ratio_disabled = false, requiredPassword = true, fApi: Ref<Api>) {

  const uploadRule = createUploadRule('应用图标', ENUM.MAX_UPLOAD_UNBAN, 'avatar_url')
  const uploadRule2 = createUploadRule('应用文件', ENUM.MAX_UPLOAD_UNBAN, 'avatar_url')

  return [
    {
      type: 'input',
      field: 'merch_name',
      title: '应用名称',
      value: '',
      props: {
        placeholder: '请输入应用名称'
      },
    //  validate: [{ type: 'string', max: 10, required: true, message: '商户名称最多10个字'}],
    },
    {
      type: 'input',
      field: 'merch_id',
      title: '应用ID',
      value: '',
      props: {
        placeholder: '请输入应用ID'
      },
    //  validate: [{ type: 'string', max: 10, required: true, message: '商户名称最多10个字'}],
    },
    {
      type: 'select',
      field: 'merchant_type',
      title: '绑定商户',
      value: 1,
      props: {
        placeholder: '请选择绑定商户',
      },
      options: Object.keys(ENUM.merchant_type).map(key => ({ label: ENUM.merchant_type[key], value: parseInt(key) })),
    },
    uploadRule,
    uploadRule2,
    
  ]
}
