

export default function (fApi: Ref<Api>) {

  return [
    {
      type: 'input',
      field: 'user_nickname',
      title: '用户昵称',
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'checkbox',
      field: 'block_type',
      title: '拉黑类型',
      value: '',
      options: Object.keys(ENUM.block_type).map(key => ({ label: ENUM.block_type[key], value: parseInt(key) })),
    },    
    {
      type: 'radio',
      field: 'blacklist_type',
      title: '拉黑时效',
      value: 1, // Default to 'allTime'
      options: Object.keys(ENUM.blacklist_type).map(key => ({ label: ENUM.blacklist_type[key], value: parseInt(key) })),
      on: {
        change: (val) => {

          const selectedValue = val.value || val

          console.log("Selected value (after accessing):", selectedValue)
          console.log("selectedValue.target.value : ", selectedValue.target.value)

          // Show the field depending on the selected radio option
          if (selectedValue.target.value === 3)
            fApi.value.hidden(false, 'join_time')
          else{
            fApi.value.hidden(true, 'join_time')
            console.log("value3 : " + selectedValue)
          }
        },
      },
    },
    {
      type: 'datePicker',
      field: 'join_time',
      title: '自定义时间',
      value: '',
      props: {
        format: 'YYYY-MM-DD',
        valueFormat: 'X',
        placeholder: ['开始时间', '结束时间'],
      },
      hidden: true,
      wrap: {
        labelCol: {
          span: 6,
        },
      },
    },
    
    {
      type: 'select',
      field: 'blacklist_platform',
      title: '拉黑平台',
      value: '全部平台',
      props: {
        placeholder: '请选择拉黑平台',
      },
    },
    {
      type: 'input',
      field: 'reason',
      title: '备注',
      value: '',
      props: {
        placeholder: '请输入拉黑备注',
        type: 'textarea',
      },
    },
  ];
}

