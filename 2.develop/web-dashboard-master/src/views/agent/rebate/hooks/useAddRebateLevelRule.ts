export default function (fApi: Ref<Api>) {
  const commonLabelCol = { span: 4 }
  const wrapperCol = { span: 12 }

  return [
    {
      type: 'input',
      field: 'level',
      title: '返点等级',
      props: {
        placeholder: '请输入返点等级',
        type: 'number',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'rebate',
      title: '返点%',
      props: {
        placeholder: '请输入返点%',
        type: 'number',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'odds',
      title: '对应赔率',
      props: {
        placeholder: '请输入对应赔率',
        type: 'number',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
  ]
}
