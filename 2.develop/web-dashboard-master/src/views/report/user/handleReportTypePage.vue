<template>
  <a-card style="min-height: 500px; align-items: center;">
    <template #title>
      <div style="display: flex; align-items: center; white-space: nowrap;">
        <div style="flex-grow: 1; text-align: center;">
          <span style="font-size: 20px; font-weight: bold;">设置举报类型</span>
        </div>
      </div>
    </template>

    <!-- Center Aligned Save Button -->
    <a-row style="justify-content: center; margin-bottom: 3%;">
      <a-input style="text-align: center; color: grey; font-size: 13px; width: 300px;" placeholder="请输入举报类型">
      </a-input>
      <a-button type="primary" style="width: 150px; margin-left: 50px;" @click="onSearch">确定</a-button>
    </a-row>

    <!-- Grid Layout for Cards (5 Columns per Row using CSS Grid) -->
    <div class="card-grid">
      <div v-for="(card, index) in coverCards" :key="index" class="card-item">
        <a-card hoverable style="border: 1px solid lightgrey; width: 150px; display: flex; justify-content: center; align-items: center; position: relative;">
          <!-- Close Button -->
          <a-button 
            type="text" 
            @click="removeCard(index)" 
            style="position: absolute; right: 0px; top: 0px;"
          >
            X
          </a-button>
          <!-- Centered Text -->
          <p style="text-align: center; margin: 0;">{{ card.fileName }}</p>
        </a-card>
      </div>
    </div>

      <!-- Center Aligned Save Button -->
    <a-row style="display: flex; justify-content: center; align-items: center; margin-top: 30px">
      <a-button type="primary" style="width: 150px; margin-right: 50px;" @click="emit('emit_back')">取消</a-button>
      <a-button type="primary" style="width: 150px;" @click="onConfirm">确定</a-button>
    </a-row>

  </a-card>
</template>

<script lang="jsx" setup>
import { reactive, onMounted } from 'vue'

const emit = defineEmits(['emit_back'])
const countCards = ref(0)
// Reactive array to store the added cover cards
const coverCards = reactive([])

// Function to add a new cover card
const onAddCover = (title) => {
  coverCards.push({ fileName: title })
  countCards.value += 1
}
// Function to add a new cover card
const onConfirm = () => {
  
  emit('emit_back')
}

onMounted(() => {
  // Add your initial cards
  onAddCover('敏感内容')
  onAddCover('政治内容')
  onAddCover('不良信息')
  onAddCover('敏感内容')
  onAddCover('政治内容')
  
  onAddCover('敏感内容')
  onAddCover('政治内容')
  onAddCover('不良信息')
  onAddCover('敏感内容')
  onAddCover('政治内容')
  
  onAddCover('敏感内容')
  onAddCover('政治内容')
  onAddCover('不良信息')
  onAddCover('敏感内容')
  onAddCover('政治内容')

})

// Function to remove a card by index
const removeCard = (index) => {
  coverCards.splice(index, 1)
}
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columns */
  grid-gap: 16px; /* Space between cards */
  margin-left: 8%; /* Adjust as needed */
  margin-right: 8%; /* Adjust as needed */
}

.card-item {
  display: flex;
  justify-content: center;
}
</style>
