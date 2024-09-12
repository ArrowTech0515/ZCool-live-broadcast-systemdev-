<template>
  <a-card style="margin-bottom: 1%;">
    <template #title>
      <div style="display: flex; align-items: center; white-space: nowrap;">
        <a-button
          type="link"
          style="font-size: 18px; margin-right: 8px;"
          @click="handleBack"
        >
          <span style="font-size: 20px; font-weight: bold; margin-left: 8px;">&lt;</span>
        </a-button>
        <div style="flex-grow: 1; text-align: center;">
          <span style="font-size: 20px; font-weight: bold;">合并应用</span>
        </div>
      </div>
    </template>

    <FormSearch
      ref="formSearchRef"
      v-model="searchParams"
      :selectedRecord="selectedRecord"
      @emit_merge="() => customTableRef.onMergeApplication()"
    />
  </a-card>
  <a-card style="margin-bottom: 1%;">
    <div style="flex-grow: 1; text-align: left; margin-bottom: 1%">
      <span style="font-size: 20px; font-weight: bold;">合并记录</span>
    </div>
    <CustomTable
      ref="customTableRef"
      :searchParams="searchParams"
      :resetSearch="() => formSearchRef.resetForm()"
    />
  </a-card>

</template>

<script setup lang="jsx">
import CustomTable from './components/CustomTable.vue'
import FormSearch from './components/FormSearch.vue'

const customTableRef = ref(null)
const formSearchRef = ref(null)
const searchParams = ref({})

const emit = defineEmits(['back'])

const props = defineProps({
  selectedRecord: {
    type: Object,
    default: () => ({}),
  },
})

const handleBack = () => {
  // Handle the back action here
  // For example, navigate to the previous page:
  emit('back') // Emit the back event to the parent component
}
</script>


<style>

/* Add transition effects */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter, .fade-slide-leave-to /* .fade-slide-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}
</style>
