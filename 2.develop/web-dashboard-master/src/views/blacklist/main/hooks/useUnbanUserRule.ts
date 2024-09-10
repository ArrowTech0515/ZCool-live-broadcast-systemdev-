import createUploadRule from '@/rules/createUploadRule'

export default function (record: any, img_cnt: Ref<number>, fApi: Ref<Api>) {

  const handleUploadChange = (count) => {
    img_cnt.value = count
    console.log("handleUploadChange : " + img_cnt.value)
  }

  const uploadRule = createUploadRule('证据图片', ENUM.MAX_UPLOAD_UNBAN, 'avatar_url', handleUploadChange)

  // Watch the unban_img_cnt to reactively update the input field
  watch(img_cnt, (newVal) => {
    if (fApi.value) {
      fApi.value.setValue('unban_img_count_field', newVal.toString())
    }
  })

  // Common style for text alignment
  const centerTextStyle = {
    textAlign: 'center !important',  // Center the text
  }

  return [
    {
      type: 'input',
      field: 'user_id',
      title: '解禁' + record.identity,
      value: record.id,
      props: {
        placeholder: '请输入',
        disabled: true,
        style: centerTextStyle,  // Apply the common style
      },
    },
    {
      type: 'input',
      field: 'nick_name',
      title: '昵称',
      value: record.nickname,
      props: {
        placeholder: '请输入昵称',
        disabled: true,
        style: centerTextStyle,  // Apply the common style
      },
    },
    {
      type: 'input',
      field: 'reason',
      title: '解禁证据',
      value: '',
      props: {
        placeholder: '证据',
        type: 'textarea',
        disabled: true,
        style: centerTextStyle,  // Apply the common style
      },
    },
    uploadRule,
    // {
    //   type: 'input',
    //   field: 'unban_img_count_field',
    //   value: img_cnt.value.toString(),
    //   props: {
    //     class: 'unban-img-count-field',
    //     disabled: true,
    //   },
    // }
  ]
}
