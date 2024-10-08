
export default function (fApi: Ref<Api>) {

  return [    
    {
      type: 'radio',
      field: 'validity_period',
      title: '生效期',
      value: '永久生效', // Default to 'allTime'
      effect: {
        required: true,
      },   
      options: [
        { label: '永久有效', value: '永久生效'}, // '永久生效'
        { label: '有效日期', value: '有效日期'},
      ],
      on: {
        change: (val) => {
          if (! fApi.value) 
            console.error("fApi is not initialized.")

          const selectedValue = val.value || val

          console.log("Selected value (after accessing):", selectedValue)
          console.log("selectedValue.target.value : ", selectedValue.target.value)

          // Show the field depending on the selected radio option
          if (selectedValue.target.value === '有效日期')
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
      title: '有效日期',
      value: '',
      props: {
        format: 'YYYY-MM-DD',
        valueFormat: 'X',
        placeholder: ['请选择日期'],
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
      field: 'IP',
      title: '白名单IP',
      value: '',
      effect: {
        required: true,
      },   
      props: {
        placeholder: '若输入过个IP则中间用","隔开',
        type: 'textarea',
      },
    },
    {
      type: 'input',
      field: 'remarks',
      title: '备注',
      value: '',
      props: {
        placeholder: '不得超过20个字符',
       // type: 'textarea',
       rows: 4,
      },
    },
    
  ]
}
