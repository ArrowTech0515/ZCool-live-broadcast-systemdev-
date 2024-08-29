<template>
  <a-select
    v-model:value="value"
    mode="multiple"
    label-in-value
    style="width: 100%"
    :filter-option="false"
    :not-found-content="state.fetching ? undefined : null"
    :options="state.data"
    @search="fetchUser"
  >
    <template
      v-if="state.fetching"
      #notFoundContent
    >
      <a-spin size="small" />
    </template>
  </a-select>
</template>
<script setup>
import { debounce } from 'lodash-es'
import { getUserGroupListReq } from '@/api/users'

const state = reactive({
  data: [],
  fetching: false,
})
const value = defineModel({default: []})
const fetchUser = debounce(async value => {
  state.data = []
  state.fetching = true
  getUserGroupListReq({
    user_group_id: value,
  }).then(res => {
      const data = res.items.map(user_group => ({
        label: user_group.name,
        value: user_group.user_group_id,
      }))
      state.data = data
      state.fetching = false
    })
}, 300)
watch(value, () => {
  state.data = []
  state.fetching = false
})
</script>
