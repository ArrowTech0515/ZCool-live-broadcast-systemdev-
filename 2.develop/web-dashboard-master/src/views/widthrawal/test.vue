<template>
  <div style="display: flex; align-items: center;">
    <a-button @click="decrement" style="color: gray; font-size: 16px; font-weight: bold; padding: 0px 12px;">
      -
    </a-button>
    <a-input
      v-model:value="value1"
      :style="{ color: 'gray', margin: '0', textAlign: 'center'}"
      inputmode="numeric"
      @keydown="handleKeydown"
    />
    <a-button @click="increment" style="color: gray; font-size: 16px; font-weight: bold; padding: 0px 12px;">
      +
    </a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '0', // Initialize value as a string
    };
  },
  mounted() {
    // Log the initial value to ensure it's correctly set
    console.log('Component mounted, initial value1:', this.value1);
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
      let currentValue = parseInt(this.value1, 10);
      if (isNaN(currentValue)) {
        currentValue = 0;
      }
      if (currentValue > 0) {
        this.value1 = String(currentValue - 1);
      }
      console.log('decrement 1:', this.value1);

    },
    increment() {
      let currentValue = parseInt(this.value1, 10);
      if (isNaN(currentValue)) {
        currentValue = 0;
      }
      this.value1 = String(currentValue + 1);
      console.log('decrement 2:', this.value1);

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
