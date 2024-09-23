<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showAddorEditRebatePage">
      <div class="page_container">
        <FormSearch
          ref="formSearchRef"
          v-model="searchParams"
          @emit_add="onAddRebate"
        />
        <CustomTable
          ref="customTableRef"
          :searchParams="searchParams"
          @emit_edit="onAddRebate"
          :resetSearch="() => formSearchRef.resetForm()"
        />
      </div>
    </div>
    <div v-else-if="showAddorEditRebatePage">
      <AddorEditRebate
        @emit_back="onBackToMainPage2"
        :mode="agent_mode"
        :item="agent_item"
        @confirm="handleConfirm"
        @reject="handleReject" />
    </div>
  </transition>
</template>

<script setup lang="jsx">
import CustomTable from './components/CustomTable.vue'
import FormSearch from './components/FormSearch.vue'
import AddorEditRebate from './AddorEditRebate.vue'

const customTableRef = ref(null)
const formSearchRef = ref(null)
const searchParams = ref({})

const showAddorEditRebatePage = ref(false) // New state to manage which view to show
const agent_mode = ref(2) // New state to manage which view to show
const agent_item = ref({}) // New state to manage which view to show

const onBackToMainPage2 = () => {
  showAddorEditRebatePage.value = false // Switch back to the main table view
}

const onAddRebate = (mode = 2, item = {}) => {
  agent_mode.value = mode  // Use .value to update ref value
  agent_item.value = item  // Use .value to update ref value

  console.log("onAddRebate : " + agent_mode.value)
  console.log("onAddRebate2 : " + agent_item.value)
  
  showAddorEditRebatePage.value = true // Switch to the add strategy view
}

</script>

<style scoped>
/* Add transition effects */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter, .fade-slide-leave-to /* .fade-slide-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}
</style>

