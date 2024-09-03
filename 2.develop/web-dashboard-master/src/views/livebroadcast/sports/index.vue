<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showEditPage && !showCoverPage">
      <div class="page_container">
        <FormSearch
          ref="formSearchRef"
          v-model="searchParams"
          @emit_cover="() => onAddCover()"
        />
        <CustomTable
          ref="customTableRef"
          :searchParams="searchParams"
          :resetSearch="() => formSearchRef.resetForm()"
          @emit_editData="() => onEditData(record)"
        />
      </div>
    </div>

    <div v-else-if="showCoverPage">
      <coverPage
        @emit_back="onBackToMainPage2"
        @confirm="handleConfirm"
        @reject="handleReject" />
    </div>
    <div v-else>
      <editPage
        @emit_back="onBackToMainPage2"
        @confirm="handleConfirm"
        @reject="handleReject" />
    </div>
  </transition>
</template>

<script setup lang="jsx">
import CustomTable from './components/CustomTable.vue'
import FormSearch from './components/FormSearch.vue'
import editPage from './editPage.vue'
import coverPage from './coverConfigPage.vue'

const customTableRef = ref(null)
const formSearchRef = ref(null)
const searchParams = ref({})

defineComponent({
  components: {
    editPage,
  }
})

const showEditPage = ref(false) // New state to manage which view to show
const showCoverPage = ref(false) // New state to manage which view to show

const onBackToMainPage2 = () => {
  showEditPage.value = false // Switch back to the main table view
  showCoverPage.value = false // Switch back to the main table view
}

const onEditData = (record) => {
  // Add logic for handling the operation (e.g., audit, lock)
  console.log("onEditData : record = " + record)
  showEditPage.value = true // Switch to the add strategy view
}
const onAddCover = () => {
  showCoverPage.value = true // Switch to the add strategy view
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
