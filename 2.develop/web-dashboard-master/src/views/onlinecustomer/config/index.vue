<template>
  <a-row class="page_container">
    <a-col style="width: 48%; margin: 0.5%;">
      <TopLeftCard style="margin-bottom: 2%;"
        @emit_clear="() => customTableRef.onForceStop()"
        />

        <TopLeftCard 
        @emit_clear="() => customTableRef.onForceStop()"
        />
    </a-col>
    <a-col style="width: 48%; margin: 0.5%;">
      <TopLeftCard style="margin-bottom: 2%;"
        @emit_clear="() => customTableRef.onForceStop()"
      />

      <TopLeftCard 
        @emit_clear="() => customTableRef.onForceStop()"
      />
    </a-col>
  </a-row>

</template>

<script setup lang="jsx">

import TopLeftCard from './components/TopLeftCard.vue'

const customTableRef = ref(null)
const searchParams = ref({})
</script>
