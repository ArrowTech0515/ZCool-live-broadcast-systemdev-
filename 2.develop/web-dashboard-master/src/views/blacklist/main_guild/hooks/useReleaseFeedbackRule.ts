import { type Api } from '@form-create/ant-design-vue'
import createUploadRule from '@/rules/createUploadRule'

const uploadRule = createUploadRule('证据', 'avatar_url')

export default function (anchor_or_user:string, fApi: Ref<Api>) {

  return [
    {
      type: 'select',
      field: 'apply_platform',
      title: '申请平台',
      value: 'XXXX商户',
    //  options: Object.keys(ENUM.block_type2).map(key => ({ label: ENUM.block_type2[key], value: parseInt(key) })),
    },
    {
      type: 'input',
      field: 'reason',
      title: '理由',
      props: {
        type: 'textarea',
        placeholder: '请输入申请解禁的理由',
      },
      style: {
        fontSize: '12px',
      },
    },
    uploadRule,
  ]
}