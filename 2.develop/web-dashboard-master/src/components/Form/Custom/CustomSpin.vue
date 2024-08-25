<template>
  <div style="position: relative; display: flex; align-items: center;">
    <!-- Left Button -->
    <a-button 
      @click="decrement" 
      style="position: absolute; left: 0; color: gray; font-size: 16px; font-weight: bold; padding: 0px 13px; z-index: 1;">
      -
    </a-button>
    
    <!-- Input Field -->
    <a-input
      v-model:value="localValue"
      :style="{ color: 'gray', margin: '0', textAlign: 'center', paddingLeft: '30px', paddingRight: '30px' }"
      inputmode="numeric"
      @keydown="handleKeydown"
      @input="updateValue"
    />
    
    <!-- Right Button -->
    <a-button 
      @click="increment" 
      style="position: absolute; right: 0; color: gray; font-size: 16px; font-weight: bold; padding: 0px 12px; z-index: 1;">
      +
    </a-button>
  </div>
</template>

<script>
export default {
  props: {
    nValue: {
      type: String,
      required: true,
    },
  },
emits: ['update:nValue'],
  data() {
    return {
      localValue: this.nValue, // Initialize with the prop value
    };
  },
  watch: {
    nValue(newValue) {
      this.localValue = newValue; // Watch for changes in the prop and update local value
    },
  },
  methods: {
    handleKeydown(event) {
      // Allow only number keys, backspace, delete, and arrow keys
      if (
        !(
          (event.key >= '0' && event.key <= '9') || // Numeric keys
          event.key === 'Backspace' || // Allow backspace
          event.key === 'Delete' || // Allow delete
          event.key === 'ArrowLeft' || // Allow left arrow
          event.key === 'ArrowRight' || // Allow right arrow
          event.key === 'Tab' // Allow tab
        )
      ) {
        event.preventDefault();
      }
    },
    decrement() {
      let currentValue = parseInt(this.localValue, 10);
      if (isNaN(currentValue)) {
        currentValue = 0;
      }
      if (currentValue > 0) {
        this.localValue = String(currentValue - 1);
        this.updateValue();
      }
      console.log('decrement:', this.localValue);
    },
    increment() {
      let currentValue = parseInt(this.localValue, 10);
      if (isNaN(currentValue)) {
        currentValue = 0;
      }
      this.localValue = String(currentValue + 1);
      this.updateValue();
      console.log('increment:', this.localValue);
    },
    updateValue() {
      this.$emit('update:nValue', this.localValue); // Emit the updated value to the parent
    },
  },
};
</script>

<style scoped>
.ant-input {
  text-align: center !important;
  padding-right: 0 !important;
  padding-left: 0 !important;
}
</style>
