export default function (fApi: Ref<Api>) {
  const commonLabelCol = { span: 4 }
  const wrapperCol = { span: 12 }

  return [
    {
      type: 'input',
      field: 'level',
      title: '层级',
      props: {
        placeholder: '请输入层级',
        type: 'number',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'name',
      title: '层级名称',
      props: {
        placeholder: '请输入层级名称',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'rebate',
      title: '默认返点%',
      props: {
        placeholder: '默认返点%',
        type: 'number',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
  ]
}
