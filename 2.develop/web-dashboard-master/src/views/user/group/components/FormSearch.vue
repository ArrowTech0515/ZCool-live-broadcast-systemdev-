<template>
  <a-card style="background-color: white; margin-bottom: 1%; ">
    <a-row :gutter="16" :type="flex" style=" align-items: center; ">
      <a-col :flex="auto" style="margin-left: 3%; margin-right: 5%;">
        <a-form-item label="分组名称">
          <a-input v-model:value="groupName" placeholder="请输入分组名称" />
        </a-form-item>
      </a-col>
      
      <a-col :span="3">
        <a-form-item>
          <a-button type="primary" block @click="onSearch">查询</a-button>
        </a-form-item>
      </a-col>
    
      <a-col :span="3">
        <a-form-item>
          <a-button block @click="onReset">重置</a-button>
        </a-form-item>
      </a-col>

      
      <a-col :span="3" style="margin-left: auto; margin-right: 1%;">
        <a-form-item>
          <a-button type="primary" block @click="emit('addItem')">新增会员分组</a-button>
        </a-form-item>
      </a-col>

    </a-row>
  </a-card>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue'
// const params = defineModel()
// const data = reactive({
//   merch_id: 0,
//   app_id: 0,
//   acct_status: 0,
//   is_bind: 0,
//   os_type: 0,
//   mu_name: '',
//   au_id: '',
//   phone: '',
//   ip: '',
//   email: '',
//   hiera: 0,
//   is_online: false,
//   reg_time: [],
// })

const emit = defineEmits(['addItem', 'search'])
const fApi = ref({})

function submitForm() {
  fApi.value.submit(formData => {
    getData(formData)
  })
}

const onSearch = () => {
  // Implement search logic
  submitForm()
}

const onReset = () => {
  groupName.value = ''
  // Implement reset logic
}

</script>

<style scoped>
/* Add your scoped styles here */
</style>
