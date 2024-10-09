
export default function (fApi: Ref<Api>) {

  return [
    {
      type: 'select',
      field: 'member_account',
      title: '会员账号',
      props: {
        placeholder: '请选择',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'input',
      field: 'amount',
      title: '盈利金额',
      value: '',
      props: {
        placeholder: '请输盈利金额',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'radio',
      field: 'whether_alert',
      title: '是否预警',
      value: 2,
      options: [
        { label: '是', value: 2 },
        { label: '否', value: 3 }
      ],
      effect: {
        required: true,
      }
    },
    {
      type: 'select',
      field: 'validity_period',
      title: '预警有效期',
      props: {
        placeholder: '请选择',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'input',
      field: 'remarks',
      title: '备注',
      value: '',
      props: {
        placeholder: '请输入',
        type: 'textarea',
      },
      effect: {
        required: true,
      }
    },
  ]
}
