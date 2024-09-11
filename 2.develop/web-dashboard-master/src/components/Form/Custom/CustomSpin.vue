<template>
  <a-row>
    <a-input-group compact class="input-container">
      <!-- Left Button -->
      <a-button
        @click="decrement"
        class="decrement-button"
      >
        -
      </a-button>
      
      <!-- Input Field -->
      <a-input
        v-model:value="showString"
        class="input-field"
        inputmode="numeric"
        @keydown="handleKeydown"
        @input="updateValue"
      >
      </a-input>
      
      <!-- Right Button -->
      <a-button
        @click="increment"
        class="increment-button"
      >
        +
      </a-button>
    </a-input-group>
    <span class="span_placeholder"
      >{{strPlaceholder}}</span>
  </a-row>
</template>

<script lang="jsx" setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  nValue: {
    type: Number,
    required: true,
    default: 0,
  },
  bShowUnit: {
    type: Boolean,
    required: false,
    default: false,
  },
  strPlaceholder: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits(['update:nValue'])

const localValue = ref(props.nValue)
const showString = ref('')

onMounted(() => {
  makeShowString(props.nValue)
})

watch(() => props.nValue, (newValue) => {
  localValue.value = newValue
})

function handleKeydown(event) {
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
    event.preventDefault()
  }
}

function decrement() {
  const currentValue = localValue.value
  if (currentValue > 0) {
    updateValue(currentValue - 1)
  }
  console.log('decrement:', localValue.value)
}

function increment() {
  const currentValue = localValue.value
  updateValue(currentValue + 1)
  console.log('increment:', localValue.value)
}
function makeShowString(value) {
  showString.value = value + (props.bShowUnit ? ' %' : '')
}
function updateValue(newVal) {
  localValue.value = newVal
  makeShowString(newVal)
  emit('update:nValue', localValue.value)
}
</script>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.decrement-button {
  flex: 0 0 auto; /* Ensure buttons are not stretched */
  width: 40px;
  z-index: 1;
}

.increment-button {
  flex: 0 0 auto; /* Ensure buttons are not stretched */
  width: 40px;
}

.input-field {
  flex: 1; /* Allow input field to take up remaining space */
  text-align: center;
}

.span_placeholder {
  color: grey;
  font-size: 12px;
}
</style>
