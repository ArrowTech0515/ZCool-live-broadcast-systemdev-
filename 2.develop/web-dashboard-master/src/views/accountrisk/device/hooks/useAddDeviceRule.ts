
export default function (fApi: Ref<Api>) {

  return [
    {
      type: 'input',
      field: '_number',
      title: '设备号',
      value: '',
      props: {
        placeholder: '请输入设备号',
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
      type: 'input',
      field: 'device_type',
      title: '设备类型',
      value: '',
      props: {
        placeholder: '请输入设备类型',
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
      type: 'input',
      field: 'os',
      title: '操作系统',
      value: '',
      props: {
        placeholder: '请输入操作系统',
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
      type: 'input',
      field: 'browser',
      title: '浏览器',
      value: '',
      props: {
        placeholder: '请输入浏览器',
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
      type: 'input',
      field: 'oper_info3',
      title: '备注',
      value: '',
      props: {
        placeholder: '请输入备注',
        type: 'textarea',
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
    
  ]
}
