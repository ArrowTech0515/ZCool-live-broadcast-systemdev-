<template>
  <div class="page_container">
    <a-row>
      <TopLeftCard style="width: 58%;"></TopLeftCard>
      <TopRightCard style="width: 38%;"></TopRightCard>
    </a-row>
    <MiddleCard></MiddleCard>
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
import TopLeftCard from './components/TopLeftCard.vue'
import TopRightCard from './components/TopRightCard.vue'
import MiddleCard from './components/MiddleCard.vue'

const customTableRef = ref(null)
const formSearchRef = ref(null)
const searchParams = ref({})
</script>
