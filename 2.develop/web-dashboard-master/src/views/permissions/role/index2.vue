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
      <a-row gutter={[16,16]}>
        <!-- Row 1 -->
        <a-col :span="4">
          <a-checkbox>用户管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>主播管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>用户管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>主播管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>用户管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>主播管理</a-checkbox>
        </a-col>
        
        <!-- Row 2 -->
        <a-col :span="4">
          <a-checkbox>用户管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>主播管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>用户管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>主播管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>用户管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>主播管理</a-checkbox>
        </a-col>
        
        <!-- Row 3 -->
        <a-col :span="4">
          <a-checkbox>用户管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>主播管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>用户管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>主播管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>用户管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>主播管理</a-checkbox>
        </a-col>
        
        <!-- Row 4 -->
        <a-col :span="4">
          <a-checkbox>用户管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>主播管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>用户管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>主播管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>用户管理</a-checkbox>
        </a-col>
        <a-col :span="4">
          <a-checkbox>主播管理</a-checkbox>
        </a-col>
      </a-row>
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
