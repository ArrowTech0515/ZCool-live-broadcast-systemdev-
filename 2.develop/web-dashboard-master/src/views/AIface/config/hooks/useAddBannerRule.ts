
import createUploadRule from '@/rules/createUploadRule'

const uploadRule = createUploadRule('Banner图⽚', 'avatar_url')

export default function (fApi: Ref<Api>) {
  // Define a reactive state for the new switch
  const newSwitchValue = ref(false); // Initially set to false

  // Watch for changes in the new switch value
  watch(newSwitchValue, (newVal) => {
    // You can perform additional logic if needed
    console.log('New switch value changed:', newVal);
  });
// Computed property for disabling the rangePicker
const isRangePickerDisabled = computed(() => {
  console.log('isRangePickerDisabled:', !newSwitchValue.value);
  return !newSwitchValue.value; // Disable if newSwitchValue is false
});

  return [  
    {
      type: 'select',
      field: 'merchant',
      title: '商户',
      //options: Object.keys(ENUM.data_permission).map(key => ({ label: ENUM.data_permission[key], value: parseInt(key) })),
      props: {
        placeholder: '请选择商户',
      },
      effect: {
        required: true,
      }
    },  
    {
      type: 'input',
      field: 'title',
      title: '标题',
      props: {
        placeholder: '请输入标题',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'switch',
      field: 'status',
      title: '状态',
      props: {
        checkedChildren: '启用',   // Text shown when switch is ON
        unCheckedChildren: '停用', // Text shown when switch is OFF
      },
      effect: {
        required: true,
      }
    },
    uploadRule,
    {
      type: 'rangePicker',
      field: 'start_end_time',
      title: '日期',
      props: {
        showTime: true,
        format: 'YYYY-MM-DD hh:mm:ss',
        valueFormat: 'X',
        placeholder: ['开始日期', '结束日期'],
        disabled: isRangePickerDisabled.value,
      },
    },
    {
      type: 'switch', // New switch added next to the date range picker
      field: 'newSwitch', // Define a new field for the switch
      title: '结束时间为空，代表永久展示',

      props: {
        checkedChildren: '永久',     // Text shown when new switch is ON
        unCheckedChildren: '时间范围',   // Text shown when new switch is OFF
      },
      on: {
        change: (val) => {
          if (! fApi.value) 
          {
            console.error("fApi is not initialized.")
            return
          }  
          newSwitchValue.value = val.value || val
        },
      },
      wrap: {
        labelCol: { span: 18 },
      },
    },
  ]
}
