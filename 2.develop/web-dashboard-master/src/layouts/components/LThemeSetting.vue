<template>
  <a-modal
    title="主题设置"
    :open="props.open"
    :keyboard="false"
    :mask-closable="false"
    @cancel="handleCancel"
    :footer="false"
  >
    <a-form
      ref="formRef"
      class="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="配色方案">
        <a-radio-group
          @change="handleColorScheme"
          :value="themeOptions.colorScheme"
          size="small"
        >
          <a-radio-button
            :value="item.name"
            :key="item.name"
            v-for="item in themes"
          >
            <a-tooltip :title="item.title">
              <IconFont :type="item.icon" />
            </a-tooltip>
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="主题色调">
        <div class="flex items-center">
          <span
            v-for="item in colorList"
            :key="item"
            class="color_item"
            :class="{ 'color_active': themeOptions.themeToken?.colorPrimary === item }"
            :style="{ backgroundColor: item as string }"
            @click="handleSetColor(item)"
          ></span>
        </div>
      </a-form-item>
      <a-form-item label="紧凑模式">
        <a-switch
          v-model:checked="themeOptions.isCompact"
          @change="handleSetCompact"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import type { RadioChangeEvent } from 'ant-design-vue'

interface IProps {
  open?: boolean
}
const props = withDefaults(defineProps<IProps>(), { open: false })
const emit = defineEmits(['update:open'])
function handleCancel() {
  emit('update:open', false)
}
const themes = ref([
  {
    name: 'auto',
    title: '跟随系统',
    icon: 'i-system',
  },
  {
    name: 'light',
    title: '浅色模式',
    icon: 'i-taiyangtianqi',
  },
  {
    name: 'dark',
    title: '深色模式',
    icon: 'i-moonyueliang',
  },
])
const { setTheme, themeOptions } = useTheme()
function handleColorScheme(e: RadioChangeEvent) {
  const colorScheme = e.target.value
  setTheme({
    colorScheme,
  })
}
const colorList = ['#7129F8', '#1890ff', '#52c41a', '#faad14', '#ff4d4f']
function handleSetColor(color) {
  setTheme({
    themeToken: {
      ...themeOptions.themeToken,
      colorPrimary: color,
    },
  })
}
function handleSetCompact(isCompact) {
  setTheme({
    isCompact,
  })
}
</script>

<style lang="sass" scoped>
.color_item
  width: 24px
  height: 24px
  margin-right: 8px
  cursor: pointer
  border-radius: 50%

  &.color_active
    border-radius: 3px

  &:last-child
    margin-right: 0
</style>
