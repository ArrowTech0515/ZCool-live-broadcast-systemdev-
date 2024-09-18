import { type Api } from '@form-create/ant-design-vue'

export default function (record:any, fApi: Ref<Api>) {

  const selectedValue = null
  const nMaxLength = 30

  return [
    {
      type: 'radio',
      field: 'type',
      title: '警告用户',
      value: '1', // Default to 'allTime'
      options: [
        { label: '被举报用户', value: '1' },
      ],
    },
    {
      type: 'input',
      field: 'reason',
      title: '警告内容',
      value: '',
      props: {
         placeholder: '请输入警告内容，将通过站内信方式通知用户',
         type: 'textarea',
         maxLength: nMaxLength,  // Set the maximum character count
         // Custom character count display
         showCount: {
           formatter: ({ count }) => `${count}/${nMaxLength}`,
         },
      },
    },
  ]
}
