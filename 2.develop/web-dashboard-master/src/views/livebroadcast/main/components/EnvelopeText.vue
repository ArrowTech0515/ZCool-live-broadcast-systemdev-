<template>
  <div class="envelope">
    <div class="diagonal-line diagonal-line-one"></div>
    <div class="diagonal-line diagonal-line-two"></div>
    <span class="text">{{ spanText }}</span>
  </div>
</template>

<style scoped>
.envelope {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 32px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  font-size: 14px;
  font-weight: bold;
  color: #000;
  overflow: hidden;
}

/* Add crossing diagonals */
.diagonal-line {
  position: absolute;
  width: 200%;  /* Increase to ensure the lines reach the corners */
  height: 100%; /* Ensure the height fits the container */
  border: 1px solid grey;
  z-index: 1; /* Set a lower z-index for lines */
}

.diagonal-line-one {
  transform: rotate(33deg);
  transform-origin: top left;
  top: -50%;
  left: -50%;
}

.diagonal-line-two {
  transform: rotate(-33deg);
  transform-origin: top right;
  top: -50%;
  right: -50%;
}

.text {
  position: relative;
  z-index: 2; /* Set a higher z-index to bring text in front */
  background-color: #f0f0f0;
  font-size: 14px;
  text-align: center;
  padding: 0 0; /* Adjust padding to make background visible around the text */
}
</style>

<script lang="jsx" setup>

import { defineProps } from 'vue';

// Define the props the component will accept
defineProps({
  spanText: {
    type: String,
    required: true,
  },
});
</script>
