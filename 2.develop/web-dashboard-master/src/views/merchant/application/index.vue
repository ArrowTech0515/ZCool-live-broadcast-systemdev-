<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showMergePage && !showMigratePage">
      <div class="page_container">
        <FormSearch
          ref="formSearchRef"
          v-model="searchParams"
          @addItem="() => customTableRef.editItem()"
        />
        <CustomTable
          ref="customTableRef"
          :searchParams="searchParams"
          :resetSearch="() => formSearchRef.resetForm()"
          @emit_merge="handleOperation"
          @emit_migrate="handleOperation2"
        />
      </div>
    </div>
    <div v-else-if="!showMigratePage">
      <mergePage :selected-record="selectedRecord" @back="onBackToMainPage2" @confirm="handleConfirm" @reject="handleReject" />
    </div>
    <div v-else>
      <migratePage :selected-record="selectedRecord" @back="onBackToMainPage2" @confirm="handleConfirm" @reject="handleReject" />
    </div>
  </transition>
</template>

<script setup lang="jsx">
import CustomTable from './components/CustomTable.vue'
import FormSearch from './components/FormSearch.vue'
import mergePage from './merge/index.vue'
import migratePage from './migrate/index.vue'

const customTableRef = ref(null)
const formSearchRef = ref(null)
const searchParams = ref({})

const showMergePage = ref(false)
const showMigratePage = ref(false)

const selectedRecord = ref({})  // Ref to hold the record data

const handleOperation = (record) => {
  selectedRecord.value = record
  console.log("handleOperation : selectedRecord = " + selectedRecord.value.application_name)
  showMergePage.value = true
}
const handleOperation2 = (record) => {
  selectedRecord.value = record
  console.log("handleOperation : selectedRecord = " + selectedRecord.value.application_name)
  showMigratePage.value = true
}


const onBackToMainPage2 = () => {
  showMergePage.value = false
  showMigratePage.value = false
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
