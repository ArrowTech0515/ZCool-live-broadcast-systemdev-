import { type Api } from '@form-create/ant-design-vue'

export default function (record:any, fApi: Ref<Api>) {

  const selectedValue = null

  return [
    {
      type: 'radio',
      field: 'type',
      title: '',
      value: 'release', // Default to 'allTime'
      options: [
        { label: '解禁', value: 'release' },
        { label: '已拒绝', value: 'rejected' }
      ],
      style: {
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        marginLeft: '80px', // Left margin to shift the radio group to the right
        gap: '80px', // Space between the radio buttons
      },
      on: {
        change: (val) => {
          selectedValue = val.value || val
        },
      },
    },
    {
      type: 'input',
      field: 'reason',
      title: '理由',
      value: '',
      props: {
         placeholder: '请输入处理原因',
         type: 'textarea'
      },
    },
  ]
}
