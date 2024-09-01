<template>
  <div class="page_container">
    <FormSearch
      ref="formSearchRef"
      v-model="searchParams"
      @emit_hideItems="() => customTableRef.onHideItems()"
      @emit_category="() => customTableRef.onCategory()"
      @emit_block="() => customTableRef.onBlock()"
      @emit_operationRecord="() => customTableRef.onOperationRecord()"
    />
    <CustomTable
      ref="customTableRef"
      :searchParams="searchParams"
      :resetSearch="() => formSearchRef.resetForm()"
    />
  </div>

</template>

<script setup lang="jsx">
import CustomTable from './components/CustomTable.vue'
import FormSearch from './components/FormSearch.vue'

const customTableRef = ref(null)
const formSearchRef = ref(null)
const searchParams = ref({})
</script>
