<template>
  <div class="page_container">
    <a-row>
      <TopLeftCard 
        style="width: 58%;"
        @emit_forceStop="() => customTableRef.onForceStop()"
        />
      <TopRightCard 
        style="width: 38%;"
        @emit_mute="() => customTableRef.onMute()"      
      />
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
import TopLeftCard from './components/TopLeftCard.vue'
import TopRightCard from './components/TopRightCard.vue'
import MiddleCard from './components/MiddleCard.vue'

const customTableRef = ref(null)
const searchParams = ref({})
</script>
