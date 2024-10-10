<template>
  <a-modal
    v-model:open="isOpen"
    title="请输入谷歌验证码"
    @ok="handleConfirm"
    @cancel="handleCancel"
    :ok-text="'确认'"
    :cancel-text="'取消'"
    :width="400"
  >
    <!-- Limit Count (Read-only) -->
    <div>
      <a-form-item label="剩余尝试次数">
        <a-input v-model:value="formValue.limit_count" :disabled="true" />
      </a-form-item>
    </div>

    <!-- Verification Code Input -->
    <div>
      <a-form-item
        label="验证码"
        :validate-status="verificationError ? 'error' : ''"
        :help="verificationError"
      >
        <a-input
          v-model:value="formValue.verification_code"
          placeholder="请输入谷歌验证码"
        />
      </a-form-item>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  open: Boolean,
  maxAttempts: {
    type: Number,
    default: 3,
  },
  correctCode: {
    type: String,
    default: '111',
  },
});

const emit = defineEmits(['update:open', 'onSuccess', 'onFail']);

const isOpen = ref(props.open);

// Manage the form data
const formValue = ref({
  limit_count: props.maxAttempts,
  verification_code: '',
});

// Track failed attempts and error message
const failedAttempts = ref(0);
const verificationError = ref('');

// Watch for prop changes to reset dialog state
watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
    if (newVal) {
      formValue.value.verification_code = '';
      failedAttempts.value = 0;
      verificationError.value = '';
      formValue.value.limit_count = props.maxAttempts; // Reset the attempt count
    }
  }
);

// Watch for changes to `isOpen` to close the dialog from the component
watch(isOpen, (newVal) => {
  emit('update:open', newVal);
});

// Handle form submission
const handleConfirm = () => {
  const enteredCode = formValue.value.verification_code;

  if (failedAttempts.value >= formValue.value.limit_count) {
    verificationError.value = `已达到最大尝试次数(${formValue.value.limit_count})。`;
    emit('onFail');
    return;
  }

  if (!enteredCode) {
    verificationError.value = '请输入谷歌验证码。';
    return;
  }

  if (enteredCode === props.correctCode) {
    // Successful verification
    failedAttempts.value = 0;
    verificationError.value = '';
    formValue.value.limit_count = props.maxAttempts; // Reset limit count after success
    emit('onSuccess');
    isOpen.value = false; // Close the dialog on success
  } else {
    // Failed verification attempt
    failedAttempts.value += 1;
    formValue.value.limit_count = props.maxAttempts - failedAttempts.value; // Decrease remaining attempts

    verificationError.value = `验证码错误。剩余尝试次数: ${
      formValue.value.limit_count
    }`;
  }
};

// Handle cancel action
const handleCancel = () => {
  isOpen.value = false; // Close the dialog
};
</script>

<style scoped>
/* Add any specific styles you need here */
</style>
