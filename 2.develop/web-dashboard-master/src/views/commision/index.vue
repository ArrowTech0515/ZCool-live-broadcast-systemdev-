<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showAddSettingsPage">
      <div class="page_container">
        <FormSearch
          ref="formSearchRef"
          v-model="searchParams"
          @emit_add_settings="() => onAddSettings()"
        />
        <CustomTable
          ref="customTableRef"
          :searchParams="searchParams"
          :resetSearch="() => formSearchRef.resetForm()"
        />
      </div>
    </div>

    <div v-else-if="showAddSettingsPage">
      <addSettingsPage
        @emit_back="onBackToMainPage2"
        @confirm="handleConfirm"
        @reject="handleReject" />
    </div>
  </transition>
</template>

<script setup lang="jsx">

import CustomTable from './components/CustomTable.vue'
import FormSearch from './components/FormSearch.vue'
import addSettingsPage from './addSettingsPage.vue'

const customTableRef = ref(null)
const formSearchRef = ref(null)
const searchParams = ref({})

const showAddSettingsPage = ref(false) // New state to manage which view to show

const onBackToMainPage2 = () => {
  showAddSettingsPage.value = false // Switch back to the main table view
}

const onAddSettings = () => {
  showAddSettingsPage.value = true // Switch to the add strategy view
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
