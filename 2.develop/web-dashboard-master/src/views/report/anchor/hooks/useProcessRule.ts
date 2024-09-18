
export default function (record:any, fApi: Ref<Api>) {

  return [
    {
      type: 'radio',
      field: 'process_type',
      title: '处理类型',
      value: '1', // Default to 'allTime'
      options: [
        { label: '禁止开播', value: '1' },
      ],
    },
    {
      type: 'radio',
      field: 'process_type',
      title: '拉黑时效',
      value: 1, // Default to 'allTime'
      options: Object.keys(ENUM.process_type).map(key => ({ label: ENUM.process_type[key], value: parseInt(key) })),
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
      type: 'input',
      field: 'reason',
      title: '理由',
      value: '',
      props: {
        placeholder: '请输入处理理由',
        type: 'textarea',
        editable: false,
      },
    },
  ]
}
