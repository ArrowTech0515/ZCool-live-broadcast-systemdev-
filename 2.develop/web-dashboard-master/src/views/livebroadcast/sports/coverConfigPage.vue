<template>
  <a-card style="min-height: 500px;">
    <template #title>
      <div style="display: flex; align-items: center; white-space: nowrap;">
        <a-button
          type="link"
          style="font-size: 18px; margin-right: 8px;"
          @click="emit('emit_back')"
        >
          <span style="font-size: 20px; font-weight: bold; margin-left: 8px;">&lt;</span>
        </a-button>
        <div style="flex-grow: 1; text-align: center;">
          <span style="font-size: 20px; font-weight: bold;">直播封面配置</span>
        </div>
      </div>
    </template>

    <!-- Center Aligned Save Button -->
    <a-row style="justify-content: center; margin-bottom: 20px;">
      <a-button type="primary" style="width: 150px; margin-right: 50px;" @click="onAddCover">添加封面</a-button>
      <span style="text-align: center; color: grey; font-size: 13px;">
        请上传XXX格式XXX尺寸的封面，用户赛事直播随机展示
      </span>
    </a-row>

    <!-- Grid Layout for Cards -->
    <a-row :gutter="[16, 16]">
      <a-col :span="8" v-for="(card, index) in coverCards" :key="index">
        <a-card hoverable style="border: 1px solid lightgrey;">
          <!-- Close Button -->
          <a-button 
            type="text" 
            @click="removeCard(index)" 
            style="position: absolute; right: 8px; top: 8px;"
          >
            X
          </a-button>

          <!-- Centered Upload Button with File Name Display -->
          <div class="upload-container">
            <a-upload
              :show-upload-list="false"
              :before-upload="file => handleUpload(file, index)"
            >
              <a-button class="upload-button">
                <template v-if="!card.fileName">
                  <p>上传封面</p>
                </template>
                <template v-else>
                  <p>{{ card.fileName }}</p>
                </template>
              </a-button>
            </a-upload>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="jsx" setup>
import { reactive } from 'vue'

const emit = defineEmits(['emit_back'])

// Reactive array to store the added cover cards
const coverCards = reactive([])

// Function to add a new cover card
const onAddCover = () => {
  coverCards.push({ fileName: '' })
}

// Function to remove a card by index
const removeCard = (index) => {
  coverCards.splice(index, 1)
}

// Function to handle the file upload
const handleUpload = (file, index) => {
  coverCards[index].fileName = file.name
  // Prevent the default behavior of the upload (like sending to a server)
  return false
}
</script>

<style scoped>
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* Adjust height as needed */
  text-align: center;
}

.upload-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
}
</style>
