<template>
  <a-card style="background-color: white; margin-bottom: 1%; ">
    <a-row :gutter="16" :type="flex" style=" align-items: center; ">

      <a-col :flex="auto">
        <a-form-item label="商户">
          <a-select v-model="merchant_type" value="all">
            <a-select-option value="all">所有商户</a-select-option>
            <a-select-option value="merchant1">商户1</a-select-option>
            <a-select-option value="merchant2">商户2</a-select-option>
            <a-select-option value="merchant3">商户3</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      
      <a-col :flex="auto">
        <a-form-item label="房间">
          <a-select v-model="room_type" value="all">
            <a-select-option value="all">全部类型</a-select-option>
            <a-select-option value="ordinary_room">普通房间</a-select-option>
            <a-select-option value="password_room">密码房间</a-select-option>
            <a-select-option value="timed_room">计时房间</a-select-option>
            <a-select-option value="ticket_room">门票房间</a-select-option>
            <a-select-option value="noble_room">贵族房间</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :flex="auto">
        <a-form-item label="工会">
          <a-select v-model="guild_type" value="all">
            <a-select-option value="all">所有工会</a-select-option>
            <a-select-option value="guild1">工会1</a-select-option>
            <a-select-option value="guild2">工会2</a-select-option>
            <a-select-option value="guild3">工会3</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :flex="auto">
        <a-form-item label="房间号搜索">
          <a-input v-model:value="room_number" placeholder="请输入房间号" />
        </a-form-item>
      </a-col>

      <a-col :flex="auto">
        <a-form-item label="主播昵称">
          <a-input v-model:value="nick_name" placeholder="请输入昵称" />
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item>
          <a-button type="primary" block @click="onSearch">
            <SearchOutlined /> 查询</a-button>
        </a-form-item>
      </a-col>
    
      <a-col :flex="1">
        <a-form-item>
          <a-button block @click="onReset">
            <ReloadOutlined /> 重置</a-button>
        </a-form-item>
      </a-col>
      
      <a-col :flex="auto" style="margin-left: auto; margin-right: 3%;">
        <a-form-item>
          <a-button type="primary" block @click="emit('emit_operationRecord')">操作记录</a-button>
        </a-form-item>
      </a-col>
      
      <a-col :span="2">
        <a-form-item>
          <a-button type="primary" block @click="emit('emit_block')">屏蔽</a-button>
        </a-form-item>
      </a-col>
      
      <a-col :span="2">
        <a-form-item>
          <a-button type="primary" block @click="emit('emit_category')">分类</a-button>
        </a-form-item>
      </a-col>
      
      <a-col :span="2">
        <a-form-item>
          <a-button type="primary" block @click="emit('emit_hideItems')">隐藏</a-button>
        </a-form-item>
      </a-col>

    </a-row>
  </a-card>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue'
// const params = defineModel()
const groupName = ref('')
const room_number = ref('')
const nick_name = ref('')
const merchant_type = ref('all')
const room_type = ref('all')
const guild_type = ref('all')

const emit = defineEmits(['emit_search', 'emit_hideItems'])
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
  room_number.value = ''
  nick_name.value = ''
  merchant_type.value = 'all'
  room_type.value = 'all'
  guild_type.value = 'all'
  // Implement reset logic
}

</script>

<style scoped>
/* Add your scoped styles here */
</style>
