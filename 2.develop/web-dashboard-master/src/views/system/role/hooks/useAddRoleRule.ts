
export default function (fApi: Ref<Api>) {

  return [  
    {
      type: 'input',
      field: 'role_name',
      title: '角色名称',
      value: '',
      props: {
        placeholder: '请输入角色名称',
        rows: 4,
      },
      effect: {
        required: true,
      }
    },  
    {
      type: 'input',
      field: 'role_id',
      title: '角色标识',
      value: '',
      props: {
        placeholder: '标识由字母、下划线、数字组成',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'input',
      field: 'role_description',
      title: '角色描述',
      value: '',
      props: {
        placeholder: '请输入角色描述',
        type: 'textarea',
        rows: 4,
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'select',
      field: 'role_permission',
      title: '数据权限',
      value: 1,
      options: Object.keys(ENUM.data_permission).map(key => ({ label: ENUM.data_permission[key], value: parseInt(key) })),
      props: {
        placeholder: '请选择数据权限',
      },
      effect: {
        required: true,
      }
    },  
  ]
}
