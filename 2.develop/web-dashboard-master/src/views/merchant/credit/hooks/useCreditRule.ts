import CustomSpin from '@/components/Form/Custom/CustomSpin.vue' // Import the custom component

formCreate.component('CustomSpin', CustomSpin) // This is important!

export default function (ps_ratio_disabled = false, requiredPassword = true, fApi: Ref<Api>) {

  return [
    {
      type: 'input',
      field: 'merch_name',
      title: '授信商户',
      value: '',
      props: {
        placeholder: '请输入商户名称'
      },
      validate: [{ type: 'string', max: 10, required: true, message: '商户名称最多10个字'}],
    },
    {
      type: 'CustomSpin', // Custom component in form-create
      field: 'nValue1', // The field name for the value you want to bind
      title: '充值钻石',
      value: 0,
      props: {
        nValue: 0,
      },
      emit: ['update:nValue'], // Listen to the emitted event
      on: {
        'update:nValue': (value) => {
          if (fApi.value) { // Check if fApi.value is not null or undefined
            fApi.value.setValue('nValue', value) // Update form value when the spin component emits the update
          } else {
            console.error('fApi is not initialized')
          }
        },
      },
    },
    {
      type: 'CustomSpin', // Custom component in form-create
      field: 'nValue2', // The field name for the value you want to bind
      title: '抵扣钻石',
      value: 0,
      props: {
        nValue: 0,
        strPlaceholder: '可使用当前商户结余收益钻石进行抵扣，减少充值钻石所需的费用',
        bShowUnit: false,
      },
      emit: ['update:nValue'], // Listen to the emitted event
      on: {
        'update:nValue': (value) => {
          if (fApi.value) { // Check if fApi.value is not null or undefined
            fApi.value.setValue('nValue', value) // Update form value when the spin component emits the update
          } else {
            console.error('fApi is not initialized')
          }
        },
      },
    },
    {
      type: 'CustomSpin', // Custom component in form-create
      field: 'nValue3', // The field name for the value you want to bind
      title: '实付钻石',
      value: 0,
      props: {
        nValue: 0,
        strPlaceholder: '展示当前商户需要支付充值的钻石金额',
        bShowUnit: false,
      },
      emit: ['update:nValue'], // Listen to the emitted event
      on: {
        'update:nValue': (value) => {
          if (fApi.value) { // Check if fApi.value is not null or undefined
            fApi.value.setValue('nValue', value) // Update form value when the spin component emits the update
          } else {
            console.error('fApi is not initialized')
          }
        },
      },
    },
    {
      type: 'input',
      field: 'nick_name',
      title: '充值备注',
      value: '',
      props: {
        placeholder: '请输入备注信息',
        type: 'textarea'
      },
    },
  ]
}
