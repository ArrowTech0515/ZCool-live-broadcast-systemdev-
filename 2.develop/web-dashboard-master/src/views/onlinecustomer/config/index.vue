<template>
  <a-row class="page_container">
    <a-col style="width: 48%; margin: 0.5%;">
      <TopLeftCard style="margin-bottom: 2%;"
        @emit_clear="() => customTableRef.onForceStop()"
        />

        <BottomLeftCard 
        @emit_clear="() => customTableRef.onForceStop()"
        />
    </a-col>
    <a-col style="width: 48%; margin: 0.5%;">
      <TopRightCard style="margin-bottom: 2%;"
        @emit_clear="() => customTableRef.onForceStop()"
      />

      <BottomRightCard 
        @emit_clear="() => customTableRef.onForceStop()"
      />
    </a-col>
  </a-row>
  <!-- Checkbox Group for VIP Levels -->
  <a-form-item label="VIP等级" :label-col="{ span: 2 }">
    <a-checkbox-group v-model="vipLevels">
      <a-checkbox v-for="level in vipOptions" :key="level.value" :value="level.value">{{ level.label }}</a-checkbox>
    </a-checkbox-group>
  </a-form-item>
  
  <!-- Custom Footer Center Aligned -->
  <div class="custom-footer">
    <a-button style="width: 100px; margin-right: 30px;" @click="handleCancel">取消</a-button>
    <a-button style="width: 100px;" type="primary" @click="handleSave">保存</a-button>
  </div>

</template>

<script setup lang="jsx">

import BottomLeftCard from './components/BottomLeftCard.vue'
import BottomRightCard from './components/BottomRightCard.vue'
import TopLeftCard from './components/TopLeftCard.vue'
import TopRightCard from './components/TopRightCard.vue'

const customTableRef = ref(null)
const searchParams = ref({})

// VIP Levels
const vipLevels = ref(['VIP0']) // Initialize with 'VIP0' checked, adjust as needed
const vipOptions = [
  { label: 'VIP0', value: 'VIP0' },
  { label: 'VIP1', value: 'VIP1' },
  { label: 'VIP2', value: 'VIP2' },
  { label: 'VIP3', value: 'VIP3' },
  { label: 'VIP4', value: 'VIP4' },
  { label: 'VIP5', value: 'VIP5' },
  { label: 'VIP6', value: 'VIP6' },
  { label: 'VIP7', value: 'VIP7' },
  { label: 'VIP8', value: 'VIP8' },
  { label: 'VIP9', value: 'VIP9' },
  { label: 'VIP10', value: 'VIP10' },
]

const handleSave = () => {
  emit('save', props.formData)
}

const handleCancel = () => {

}

</script>

<style>

.custom-footer {
  display: flex; align-items: center; justify-content: center; 
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
