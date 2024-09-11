<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showDetailsPage">
      <div class="page_container">
        <FormSearch
          ref="formSearchRef"
          v-model="searchParams"
          @emit_credit="() => customTableRef.onCredit()"
        />
        <CustomTable
          ref="customTableRef"
          :searchParams="searchParams"
          :resetSearch="() => formSearchRef.resetForm()"
          @emit_credit_details="() => handleOperation()"
        />
      </div>
    </div>
    <div v-else>
      <detailsPage :formData="selectedActivity" @back="onBackToMainPage2" @confirm="handleConfirm" @reject="handleReject" />
    </div>
  </transition>
</template>

<script setup lang="jsx">
import CustomTable from './components/CustomTable.vue'
import FormSearch from './components/FormSearch.vue'
import detailsPage from './details/index.vue'

const customTableRef = ref(null)
const formSearchRef = ref(null)
const searchParams = ref({})

const showDetailsPage = ref(false)

const handleOperation = (record) => {
    showDetailsPage.value = true
}

const onBackToMainPage2 = () => {
  showDetailsPage.value = false
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
