import CustomSpin from '@/components/Form/Custom/CustomSpin.vue' // Import the custom component

formCreate.component('CustomSpin', CustomSpin) // This is important!

import createUploadRule from '@/rules/createUploadRule'

const uploadRule = createUploadRule('人脸图片', 'thumbnail')
const uploadRule2 = createUploadRule('人脸图标', 'thumbnail')

export default function (record, fApi: Ref<Api>) {
  // Define a reactive state for the new switch

  return [  
    uploadRule,
    uploadRule2,
    {
      type: 'input',
      field: 'name',
      title: '人脸名称',
      props: {
        placeholder: '请输入人脸名称',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'upload',
      field: 'filename',
      title: '人脸文件',
      props: {
        maxCount: 1,
        // action: import.meta.env.VITE_API_HOST + '/api/v1/upload/resource',
        // data: () => ({ type: 1 }),
        // onSuccess(file) {
        //   if (file?.response?.status === 200) {
        //     file.url = file.response.data.link
        //   } else {
        //     $message.error('上传失败')
        //     return null
        //   }
        // },
        // onChange(info) {
        //   const { fileList } = info
        //   // Send the current file count to the parent
        //   console.log("onUploadChange : " + fileList.length)
        //   //onUploadChange(fileList.length)
        // },
      },
      // value: []
    },
    {
      type: 'CustomSpin', // Custom component in form-create
      field: 'price', // The field name for the value you want to bind
      title: '人脸价格',
      props: {
        nValue: record.price,
      },
    //  emit: ['update:nValue'], // Listen to the emitted event
      on: {
        'update:nValue': (value) => {
          if (fApi.value) { // Check if fApi.value is not null or undefined
            fApi.value.setValue('price', value) // Update form value when the spin component emits the update
            console.error('value : ' + value)
          } else {
            console.error('fApi is not initialized')
          }
        },
      },
    },
    {
      type: 'CustomSpin', // Custom component in form-create
      field: 'time_mins', // The field name for the value you want to bind
      title: '人脸时间',
      props: {
        nValue: record.time_mins,
        bShowUnit: true,
        unit: '分钟',
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
      type: 'select',
      field: 'authorized_merchants',
      title: '授权商户',
      value: '全部商户',
      //options: Object.keys(ENUM.data_permission).map(key => ({ label: ENUM.data_permission[key], value: parseInt(key) })),
      props: {
        placeholder: '请选择授权商户',
      },
      // effect: {
      //   required: true,
      // }
    },  
  ]
}
