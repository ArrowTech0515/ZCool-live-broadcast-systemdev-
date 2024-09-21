export default function (record:any, fApi: Ref<Api>) {
  const commonLabelCol = { span: 10 }; // Consistent label column width
  const wrapperCol = { span: 14 }; // Adjust wrapper to align the content properly

  return [
    {
      type: 'input',
      field: 'agentAccount',
      title: '代理帐号', // Changed the label for clarity
      props: {
        placeholder: '请输入代理帐号',
        value: 'tiktok999',
      },
      effect: {
        required: true,
      },
      wrap: {
        labelCol: commonLabelCol,
        wrapperCol: wrapperCol,
      },
    },
  ]
}
