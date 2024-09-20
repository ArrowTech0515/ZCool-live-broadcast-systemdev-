<template>
  <a-card style="margin-bottom: 1%;">
    <a-row :gutter="16" style="display: flex; justify-content: flex-start; align-items: center; margin-bottom: -20px;">
      <a-col :span="2">
        <a-form-item>
          <a-button type="primary" block @click="onAdd">新增</a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-card>

  <a-table :data-source="paginatedData" :pagination="false">
    <a-table-column title="排序" dataIndex="sorting" key="sorting" align="center" />
    <a-table-column title="奖励名称" dataIndex="name" key="name" align="center"/>
    <a-table-column title="数量" dataIndex="quantity" key="quantity" align="center" />
    <a-table-column title="操作" dataIndex="operate" key="operate" align="center"/>

    <template #bodyCell="{ column, record }">
      <span v-if="column.dataIndex === 'operate'">
        <span style="text-decoration: underline;color: green; cursor: pointer;" @click="handleOperation(record)">编辑</span>
      </span>
      <span v-else>{{ record[column.dataIndex] }}</span>
    </template>
  </a-table>

  <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
    <span style="margin-right: 8px;">共 {{ totalItems }}条</span>
    <a-pagination
      v-model:current="currentPage"
      :total="totalItems"
      :page-size="pageSize"
      show-size-changer
      :page-size-options="['5', '10', '20', '50', '100']"
      :simple="false"
      size="small"
      @change="handlePageChange"
      @show-size-change="handleSizeChange"
    />
  </div>

  <AddorEditDialog 
    :isModalVisible="isModalVisible"
    :formData="selectedRow"
    :operationType="operationType"
    @update:is-modal-visible="val => isModalVisible = val"
    @save="handleSave"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AddorEditDialog from './AddorEditDialog.vue';

const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);
const isModalVisible = ref(false);
const selectedRow = ref(null);
const operationType = ref('新增'); // Default operation type

const dataSource = ref([
  { key: '1', sorting: '1', name: '金币', quantity: '100', operate: '编辑' },
  { key: '2', sorting: '2', name: '幸运值', quantity: '100', operate: '编辑' },
  { key: '3', sorting: '3', name: '能量', quantity: '100', operate: '编辑' },
  { key: '4', sorting: '4', name: '钻石', quantity: '100', operate: '编辑' },
  { key: '5', sorting: '5', name: '积分', quantity: '100', operate: '编辑' },
  { key: '6', sorting: '6', name: '魅力', quantity: '100', operate: '编辑' },
]);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.value.slice(start, end);
});

const onAdd = () => {
  selectedRow.value = {
    key: String(dataSource.value.length + 1), // Generate a new key
    sorting: '',
    name: '',
    quantity: '',
  };
  operationType.value = '新增';
  isModalVisible.value = true;
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleSizeChange = (current, size) => {
  pageSize.value = size;
  currentPage.value = 1; // Reset to the first page when page size changes
};

const handleOperation = (record) => {
  selectedRow.value = { ...record }; // Deep copy the selected row data
  operationType.value = '编辑';
  isModalVisible.value = true;
};

const handleSave = (updatedData) => {
  if (operationType.value === '新增') {
    dataSource.value.push({
      ...updatedData,
      key: String(dataSource.value.length + 1), // Generate a new key
    });
  } else if (operationType.value === '编辑') {
    const index = dataSource.value.findIndex(item => item.key === updatedData.key);
    if (index !== -1) {
      dataSource.value.splice(index, 1, updatedData);
    }
  }
  totalItems.value = dataSource.value.length; // Update totalItems if needed
  isModalVisible.value = false; // Close the dialog
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
