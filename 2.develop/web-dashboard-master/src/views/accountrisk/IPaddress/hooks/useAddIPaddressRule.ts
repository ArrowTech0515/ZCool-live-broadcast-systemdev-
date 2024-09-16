import formCreate, { type Api } from '@form-create/ant-design-vue'

export default function (fApi: Ref<Api>) {

  return [    
    {
      type: 'input',
      field: 'IP_address',
      title: 'IP地址',
      value: '',
      props: {
        placeholder: '请输入IP地址',
      },
      // validate: [{ type: 'string', max: 10, message: '昵称为2-6个中文汉字', pattern: '^[\u4e00-\u9fa5]{2,6}$' }],
      validate: [{ 
        type: 'string', 
        max: 15, 
        message: '请输入有效的IP地址 (xxx.xxx.xxx.xxx)', 
        pattern: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ 
      }],
       effect: {
         required: true,
      //   validate: (value) => {
      //     // Regular expression for validating an IPv4 address
      //     const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    
      //     // Regular expression for validating an IPv6 address
      //     const ipv6Pattern = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]|)[0-9])\.(25[0-5]|(2[0-4]|1{0,1}[0-9]|)[0-9])\.(25[0-5]|(2[0-4]|1{0,1}[0-9]|)[0-9])\.(25[0-5]|(2[0-4]|1{0,1}[0-9]|)[0-9]))|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]|)[0-9])\.(25[0-5]|(2[0-4]|1{0,1}[0-9]|)[0-9])\.(25[0-5]|(2[0-4]|1{0,1}[0-9]|)[0-9])\.(25[0-5]|(2[0-4]|1{0,1}[0-9]|)[0-9])))/
    
      //     if (ipv4Pattern.test(value) || ipv6Pattern.test(value)) {
      //       return true // IP address is valid
      //     }
      //     return '请输入有效的IP地址' // Error message
      //   },
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
