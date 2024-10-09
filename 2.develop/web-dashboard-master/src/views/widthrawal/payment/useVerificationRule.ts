

export default function (fApi: Ref<Api>) {

  return [
  
    {
      type: 'input',
      field: 'limit_count',
      title: '限制金额',
      value: 0,
      props: {
        type: 'number',
      },
    },
    {
      type: 'input',
      field: 'limit_count',
      title: '验证码',
      props: {
        placeholder: '请输入谷歌验证码',
      },
      validate: [{ type: 'string', max: 10, required: true, message: '请输入谷歌验证码' }],
    },
  ]
}
