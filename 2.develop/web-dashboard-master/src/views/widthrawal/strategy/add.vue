<template>
  <a-card>
    <template #title>
      <div style="display: flex; align-items: center;">
        <a-button
          type="link"
          style="font-size: 18px; margin-right: 8px;"
          @click="handleBack"
        >
          <span style="font-size: 20px; font-weight: bold; margin-left: 8px;" >&lt;</span>
        </a-button>
        <span>添加策略</span>
      </div>
    </template>

    <a-form :layout="'vertical'">
      <!-- Form Items Here -->

      <a-form-item label="策略名称">
        <a-input placeholder="请输入策略名称" />
      </a-form-item>

      <!-- Other form items as previously described -->

      <a-form-item label="策略状态">
        <a-switch checked-children="启用" un-checked-children="关闭" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary">保存</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  methods: {
    handleBack() {
      // Handle the back action here
      // For example, navigate to the previous page:
      this.$emit('back'); // Emit the back event to the parent component
    },
  },
};
</script>
