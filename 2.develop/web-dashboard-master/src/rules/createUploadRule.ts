const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('只能上传 JPEG或者PNG 格式的图片!')
  }
  const isLt2M = file.size / 1024 / 1024 < 5
  if (!isLt2M) {
    message.error('图片大小不能超过 5MB!')
  }
  return isJpgOrPng && isLt2M
}

export default function (title = '头像', field = 'avatar_url') {
  return {
    type: 'upload',
    field,
    title,
    props: {
      maxCount: 1,
      listType: "picture-card",
      accept: 'image/png,image/jpeg,image/jpg',
      action: import.meta.env.VITE_API_HOST + '/api/v1/upload/resource',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      beforeUpload,
      data: () => ({ type: 1 }),
      onSuccess(file) {
        if (file?.response?.status === 200) {
          file.url = file.response.data.link
        } else {
          $message.error('上传失败')
          return null
        }
      },
    },
    value: []
  }
}
