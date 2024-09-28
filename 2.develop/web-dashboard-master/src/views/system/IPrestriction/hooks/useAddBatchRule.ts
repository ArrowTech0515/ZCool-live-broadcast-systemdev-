
export default function (fApi: Ref<Api>) {

  return [    
    {
      type: 'radio',
      field: 'validity_period',
      title: '生效期',
      value: 1, // Default to 'allTime'
      effect: {
        required: true,
      },
      options: Object.keys(ENUM.validity_period).map(key => ({ label: ENUM.validity_period[key], value: parseInt(key) })),
      on: {
        change: (val) => {
          const selectedValue = val.value || val;  // Handle value directly

          console.log("Selected value:", selectedValue);

          // Show or hide 'join_time' field based on the selected radio option
          if (selectedValue === 3) {
            fApi.value.hidden(false, 'join_time');  // Show 'join_time' field
          } else {
            fApi.value.hidden(true, 'join_time');   // Hide 'join_time' field
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
