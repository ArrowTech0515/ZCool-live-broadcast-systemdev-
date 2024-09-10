import { type Api } from '@form-create/ant-design-vue'
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue' // Import the custom component

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
      type: 'CustomSpin',  // Use the custom component as a form field
      field: 'nValue', // The field name for the value you want to bind
      title: 'Custom Spin', // Label for the field
      value: '0', // Default value
      props: {
        nValue: '0', // Pass initial value for the spin component
      },
      emit: ['update:nValue'], // Listen to the emitted events to update form
      on: {
        'update:nValue': (value: string) => {
          fApi.value.setValue('nValue', value); // Update the form value when the spin component emits an update
        },
      },
    },
  ];
}
