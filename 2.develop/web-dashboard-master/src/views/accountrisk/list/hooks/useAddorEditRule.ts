import formCreate, { type Api } from '@form-create/ant-design-vue'
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue' // Import the custom component

formCreate.component('CustomSpin', CustomSpin) // This is important!

export default function (ps_ratio_disabled = false, requiredPassword = true, fApi: Ref<Api>) {

  return [
    {
      type: 'input',
      field: 'merch_name',
      title: '商户名称',
      value: '',
      props: {
        placeholder: '请输入商户名称'
      },
      validate: [{ type: 'string', max: 10, required: true, message: '商户名称最多10个字'}],
    },
    {
      type: 'CustomSpin', // Custom component in form-create
      field: 'nValue1', // The field name for the value you want to bind
      title: '礼物分成',
      value: 0,
      props: {
        nValue: 0,
        strPlaceholder: '礼物分成包括：所有礼物、付费弹幕、加入粉丝团、语言翻译、付费房间收益',
        bShowUnit: true,
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
      title: '贵族分成',
      value: 0,
      props: {
        nValue: 0,
        bShowUnit: true,
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
      title: '人脸分成',
      value: 0,
      props: {
        nValue: 0,
        bShowUnit: true,
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
      field: 'nValue4', // The field name for the value you want to bind
      title: '游戏分成',
      value: 0,
      props: {
        nValue: 0,
        bShowUnit: true,
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
      field: 'nValue5', // The field name for the value you want to bind
      title: '坐骑分成',
      value: 0,
      props: {
        nValue: 0,
        bShowUnit: true,
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
      field: 'nValue6', // The field name for the value you want to bind
      title: '靓号分成',
      value: 0,
      props: {
        nValue: 0,
        bShowUnit: true,
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
  ]
}
