
export default function (fApi: Ref<Api>) {

  return [  
    {
      type: 'input',
      field: 'user_name',
      title: '用户名',
      value: '',
      props: {
        placeholder: '请输入用户名',
      },
      effect: {
        required: true,
      }
    },  
    {
      type: 'input',
      field: 'password',
      title: '密码',
      value: '',
      validate: [{ type: 'pattern', required: true, pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$', message: '请输入 8~16位数字和字母组合密码' }],
      props: {
        type: 'password',
        placeholder: '请输入密码',
      },
    },
    {
      type: 'input',
      field: 'name',
      title: '姓名',
      value: '',
      props: {
        placeholder: '请输入姓名',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'input',
      field: 'phone_number',
      title: '手机号',
      value: '',
      validate: [{ type: 'string', message: '请输入正确的手机号', required: true }],
      props: {
        placeholder: '请输入手机号',
        type: 'tel',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'radio',
      field: 'status',
      title: '状态',
      value: 1,
      options: Object.keys(ENUM.system_user_status).map(key => ({ label: ENUM.system_user_status[key], value: parseInt(key) })),
      props: {
        placeholder: '请选择数据权限',
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
        placeholder: '请输入备注',
        type: 'textarea',
        rows: 3,
      },
    },
  ]
}
