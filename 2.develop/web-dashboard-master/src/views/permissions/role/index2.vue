<template>
  <a-form
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 14 }"
    @submit="onSubmit"
  >
    <!-- Textbox -->
    <a-form-item label="角色名称">
      <a-input v-model="inputValue" placeholder="请输入" />
    </a-form-item>

    <!-- Radio Group -->
    <a-form-item label="角色类型">
      <a-radio-group v-model="radioValue">
        <a-radio value="radio1">平台</a-radio>
        <a-radio value="radio2">工会</a-radio>
        <a-radio value="radio3">机构</a-radio>
      </a-radio-group>
    </a-form-item>

    <!-- Checkbox Group 1 (6x4 = 24 checkboxes) -->
    <a-form-item label="角色权限">
      <a-checkbox-group v-model="checkboxGroup1">
        <!-- Group 1 -->
        <a-checkbox value="group1-option1">用户管理</a-checkbox>
        <a-checkbox value="group1-option2">主播管理</a-checkbox>
        <a-checkbox value="group1-option3">用户管理</a-checkbox>
        <a-checkbox value="group1-option4">主播管理</a-checkbox>
        <a-checkbox value="group1-option5">用户管理</a-checkbox>
        <a-checkbox value="group1-option6">主播管理</a-checkbox>

        <!-- Group 2 -->
        <a-checkbox value="group2-option1">用户管理</a-checkbox>
        <a-checkbox value="group2-option2">主播管理</a-checkbox>
        <a-checkbox value="group2-option3">用户管理</a-checkbox>
        <a-checkbox value="group2-option4">主播管理</a-checkbox>
        <a-checkbox value="group2-option5">用户管理</a-checkbox>
        <a-checkbox value="group2-option6">主播管理</a-checkbox>

        <!-- Group 3 -->
        <a-checkbox value="group3-option1">用户管理</a-checkbox>
        <a-checkbox value="group3-option2">主播管理</a-checkbox>
        <a-checkbox value="group3-option3">用户管理</a-checkbox>
        <a-checkbox value="group3-option4">主播管理</a-checkbox>
        <a-checkbox value="group3-option5">用户管理</a-checkbox>
        <a-checkbox value="group3-option6">主播管理</a-checkbox>

        <!-- Group 4 -->
        <a-checkbox value="group4-option1">用户管理</a-checkbox>
        <a-checkbox value="group4-option2">主播管理</a-checkbox>
        <a-checkbox value="group4-option3">用户管理</a-checkbox>
        <a-checkbox value="group4-option4">主播管理</a-checkbox>
        <a-checkbox value="group4-option5">用户管理</a-checkbox>
        <a-checkbox value="group4-option6">主播管理</a-checkbox>
      </a-checkbox-group>
    </a-form-item>

    <!-- Checkbox Group 2 (4 checkboxes) -->
    <a-form-item label="操作权限">
      <a-checkbox-group v-model="checkboxGroup2">
        <a-checkbox value="group2-checkbox1">增</a-checkbox>
        <a-checkbox value="group2-checkbox2">删</a-checkbox>
        <a-checkbox value="group2-checkbox3">改</a-checkbox>
        <a-checkbox value="group2-checkbox4">查</a-checkbox>
      </a-checkbox-group>
    </a-form-item>

    <!-- Submit Button -->
    <a-form-item :wrapper-col="{ span: 14, offset: 11 }">
      <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      radioValue: 'radio1',
      checkboxGroup1: [],
      checkboxGroup2: [],
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      console.log('Input:', this.inputValue);
      console.log('Radio:', this.radioValue);
      console.log('Checkbox Group 1:', this.checkboxGroup1);
      console.log('Checkbox Group 2:', this.checkboxGroup2);
    },
  },
};
</script>
