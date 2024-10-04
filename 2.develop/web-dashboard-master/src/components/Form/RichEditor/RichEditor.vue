<template>
  <QuillEditor
    ref="editor"
    v-model:content="value"
    :modules="modules"
    class="__QuillEditor"
    content-type="html"
    :toolbar="toolbarOptions"
  />
</template>

<script setup lang="ts" name="RichEditor">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import ImageUploader from 'quill-image-uploader'
import BlotFormatter from 'quill-blot-formatter'
import { uploadImgReq } from '@/api/public'

const props = defineProps({
  modelValue: String,
  path: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const editor = ref(null)
const value = computed({
  get() {
    if (!props.modelValue) {
      editor.value?.setText('')
    }
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  },
})

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['blockquote'], // 引用  代码块-----['blockquote', 'code-block']
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ header: 1 }, { header: 2 }],
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: '-1' }, { indent: '+1' }],
  [{ size: ['small', false, 'large', 'huge'] }], // 配置字号
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  // [{ font: [] }], // 显示字体选择
  [{ align: [] }], // 对齐方式-----
  ['clean'], // 清除文本格式-----
  // ['link', 'image', 'video'], // 链接、图片、视频-----
  ['link', 'image'], // 链接、图片、视频-----
]

const modules = [
  {
    name: 'imageUploader',
    module: ImageUploader,
    options: {
      upload(file: File) {
        return new Promise((resolve, reject) => {
          if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
            $message.error('请上传 png/jpg 格式的图片')
            setTimeout(() => {
              reject()
            }, 30)
          } else if (file.size / 1024 / 1024 > 6) {
            $message.error('文件最大不超过 6MB，请重新上传')
            setTimeout(() => {
              reject()
            }, 30)
          } else {
            // 资源类型(1,头像 2,封面 3,图片 4,视频)
            uploadImgReq(file, 3).then((res) => {
              resolve(res.link)
            }).catch(() => {
              reject()
            })
          }
        })
      },
    },
  },
  {
    name: 'blotFormatter',
    module: BlotFormatter,
    options: {/* options */ }
  }
]
</script>

<style lang="sass">
.__QuillEditor
  height: 300px
  width: 100%

  .ql-toolbar
    display: flex
    flex-wrap: wrap
    
  .ql-editor
    font-size: 15px
    line-height: 28px
    text-align: justify

.ql-snow .ql-tooltip[data-mode=link]::before
  content: "编辑链接："

.ql-snow .ql-tooltip.ql-editing a.ql-action::after
  content: '保存'

.ql-snow .ql-tooltip::before
  content: "访问 URL："

.ql-snow .ql-tooltip a.ql-action::after
  content: '编辑'

.ql-snow .ql-tooltip a.ql-remove::before
  content: '删除'
</style>
