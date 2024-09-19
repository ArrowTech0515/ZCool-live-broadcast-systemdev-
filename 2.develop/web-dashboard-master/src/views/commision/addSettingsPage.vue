<template>
  <a-card style="min-height: 500px; align-items: center;">
    <template #title>
      <div style="display: flex; align-items: center; white-space: nowrap;">
        <div style="flex-grow: 1; text-align: center;">
          <span style="font-size: 20px; font-weight: bold;">设置举报类型</span>
        </div>
      </div>
    </template>

    <!-- Grid Layout for Cards (6 Columns per Row using CSS Grid) -->
    <a-col class="grid-layout">
      <a-button type="primary" style="width: 120px;  margin-bottom: 20px;" @click="onAddBalance">添加余额奖励</a-button>
      <div class="card-grid">
        <div v-for="(card, index) in coverCards_1" :key="index" class="card-item">
          <a-card class="card-class" hoverable >
            <span 
              @click="removeCard_1(index)" 
              style="position: absolute; right: 5px; top: 0px; "
            > x </span>
            <p style="text-align: center; margin: 0 0;">{{ card.centerText }}</p>
          </a-card>
        </div>
      </div>
    </a-col>
    <!-- Grid Layout for Cards (6 Columns per Row using CSS Grid) -->
    <a-col class="grid-layout">
      <a-button type="primary" style="width: 120px;  margin-bottom: 20px;" @click="onAddDiamondReward">添加钻石奖励</a-button>
      <div class="card-grid">
        <div v-for="(card, index) in coverCards_2" :key="index" class="card-item">
          <a-card class="card-class" hoverable >
            <span 
              @click="removeCard_2(index)" 
              style="position: absolute; right: 5px; top: 0px; "
            > x </span>
            <p style="text-align: center; margin: 0 0;">{{ card.centerText }}</p>
          </a-card>
        </div>
      </div>
    </a-col>
    <!-- Grid Layout for Cards (6 Columns per Row using CSS Grid) -->
    <a-col class="grid-layout">
      <a-button type="primary" style="width: 120px;  margin-bottom: 20px;" @click="onAddThanks">添加谢谢惠顾</a-button>
      <div class="card-grid">
        <div v-for="(card, index) in coverCards_3" :key="index" class="card-item">
          <a-card class="card-class" hoverable >
            <span 
              @click="removeCard_3(index)" 
              style="position: absolute; right: 5px; top: 0px;"
            > x </span>
            <p style="text-align: center; margin: 0 0;">{{ card.centerText }}</p>
          </a-card>
        </div>
      </div>
    </a-col>

      <!-- Center Aligned Save Button -->
    <a-row style="display: flex; justify-content: center; align-items: center; margin-top: 30px">
      <a-button type="default" style="width: 150px; margin-right: 50px;" @click="emit('emit_back')">取消</a-button>
      <a-button type="primary" style="width: 150px;" @click="onConfirm">确定</a-button>
    </a-row>

  </a-card>
</template>

<script lang="jsx" setup>
import { reactive, onMounted } from 'vue'

const emit = defineEmits(['emit_back'])
const countCards_1 = ref(0)
const countCards_2 = ref(0)
const countCards_3 = ref(0)
// Reactive array to store the added cover cards
const coverCards_1 = reactive([])
const coverCards_2 = reactive([])
const coverCards_3 = reactive([])

// Function to add a new cover card
const onAddBalance = (event=null, title='0') => {
  coverCards_1.push({ centerText: title })
  countCards_1.value += 1
}
// Function to add a new cover card
const onAddDiamondReward = (event=null, title='0') => {
  coverCards_2.push({ centerText: title })
  countCards_2.value += 1
}
// Function to add a new cover card
const onAddThanks = (event=null, title='谢谢惠顾') => {
  coverCards_3.push({ centerText: title })
  countCards_3.value += 1
}
// Function to add a new cover card
const onConfirm = () => {
  
  emit('emit_back')
}

onMounted(() => {
  // Add your initial cards
  onAddBalance()
  onAddBalance()
  onAddBalance('0')

  onAddDiamondReward('0')
  onAddDiamondReward()
  onAddDiamondReward('0')

  onAddThanks('谢谢惠顾')
  onAddThanks()
  onAddThanks()
})

// Function to remove a card by index
const removeCard_1 = (index) => {
  coverCards_1.splice(index, 1)
}
// Function to remove a card by index
const removeCard_2 = (index) => {
  coverCards_2.splice(index, 1)
}
// Function to remove a card by index
const removeCard_3 = (index) => {
  coverCards_3.splice(index, 1)
}
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 5 columns */
  grid-gap: 16px; /* Space between cards */
}

.grid-layout {
  align-items: left; 
  justify-content: left; 
  margin-left: 5%; 
  margin-right: 5%; 
  margin-bottom: 20px;
}
.card-item {
  display: flex;
  justify-content: center;
}
.card-class {
  border: 1px solid lightgrey; 
  width: 150px; 
  height: 40px; 
  display: flex; 
  justify-content: center; 
  align-items: center;
}
</style>
