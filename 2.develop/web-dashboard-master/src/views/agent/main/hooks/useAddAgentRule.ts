
export default function (fApi: Ref<Api>) {

  return [
    {
      type: 'input',
      field: 'label',
      title: '标签',
      props: {
        placeholder: '请输入标签',
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
      type: 'switch',
      field: 'param1',
      title: '出款风控审核',
      wrap: {
        labelCol: {
          span: 6,
        },
      },
    },
    {
      type: 'switch',
      field: 'param2',
      title: '晋级奖励',
      wrap: {
        labelCol: {
          span: 6,
        },
      },
    },
    {
      type: 'switch',
      field: 'param3',
      title: '俸禄奖励',
      wrap: {
        labelCol: {
          span: 6,
        },
      },
    },
  ]
}
