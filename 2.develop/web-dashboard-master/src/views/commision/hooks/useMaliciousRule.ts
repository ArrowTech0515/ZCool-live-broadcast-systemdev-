import { type Api } from '@form-create/ant-design-vue'

export default function (record:any, fApi: Ref<Api>) {

  const nMaxLength = 30

  return [
    {
      type: 'input',
      field: 'reason',
      title: '反馈内容',
      value: '',
      props: {
         placeholder: '反馈内容将通过站内信方式通知举报用户',
         type: 'textarea',
         maxLength: nMaxLength,  // Set the maximum character count
         // Custom character count display
         showCount: {
           formatter: ({ count }) => `${count}/${nMaxLength}`,
         },
         editable: false,
        },
    },
  ]
}
