<template>
    <a-input-number
      class="centered-input-number"
      v-model:value="localValue"
      @change="emitChange"
      placeholder="请输入"
    />
  </template>
  
  <script setup lang="jsx">
  
  const props = defineProps({
    modelValue: {
      type: Number,
    //   default: 0,
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  const localValue = ref(props.modelValue);
  
  // Emit changes when localValue changes
  function emitChange(newValue) {
    emit('update:modelValue', newValue);
  }
  </script>
  
  <style>
  .centered-input-number {
    text-align: center;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
  
  .centered-input-number .ant-input-number-input {
    text-align: center;
  }
  </style>
  